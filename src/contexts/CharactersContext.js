import React, {
	createContext,
	useEffect,
	useState,
	useReducer,
} from 'react';
import { message } from 'antd';

import { makeUrl, toPascalCase } from '@config/util';
import useDataApi from '@hooks/useDataApi';

import generalReducer, {
	ADD_PAGE,
	ADD_RESULTS,
} from './Character/GeneralReducer';

import TemplateReducer from './Character/TemplateReducer';

export const CharactersContext = createContext();

export const CharactersProvider = ({ children }) => {
	const [searchFilter, setSearchFilter] = useState();
	const [result, setResult] = useState([]);
	const [favorites, setFavorites] = useState([]);


	const [byName, dispatchByName] = useReducer(TemplateReducer, {});
	const [byComics, dispatchByComics] = useReducer(TemplateReducer, {});
	const [byStories, dispatchByStories] = useReducer(TemplateReducer, {});
	const [general, dispatchGeneral] = useReducer(generalReducer, { total: 0, pages: {} });

	const filterOptions = [
		'stories',
		'comics',
		'name',
	];

	const [characterState, fetchCharacters] = useDataApi(makeUrl('characters'));

	const fetchData = (page, params = {}) => {
		const offset = (page - 1) * 10;
		fetchCharacters({
			params: {
				...params,
				offset,
				limit: 10,
			},
		});
	};

	const search = ({ page, filter }) => {
		if (!filter) {
			setSearchFilter();
			if (general.pages[page]) {
				setResult({
					total: general.total,
					rows: general.pages[page],
				});
			} else {
				dispatchGeneral({ type: ADD_PAGE, payload: page });
				fetchData(page);
			}
		} else if (filterOptions.includes(filter.name)) {
			const actualResult = [`by${toPascalCase(filter.name)}`]?.[filter.value]?.pages[page];

			// the page with de filtered by filter.name with value filter.value already exists
			if (actualResult) {
				setResult({
					total: [`by${toPascalCase(filter.name)}`]?.[filter.value]?.total,
					rows: actualResult,
				});
				setSearchFilter();
			} else {
				// the page or the filter doesnt exists
				setSearchFilter(filter);
				[`dispatchBy${toPascalCase(filter.name)}`]({
					type: ADD_PAGE,
					payload: {
						addingPage: page,
						addingSearchValue: filter.value,
					},
				});

				fetchData(page, {
					[filter.name]: filter.value,
				});
			}
		}
	};


	useEffect(() => {
		if (characterState.isSuccess) {
			const response = characterState.data;

			if (!searchFilter) {
				dispatchGeneral({
					type: ADD_RESULTS,
					payload: {
						total: response?.data?.total || 0,
						rows: response?.data?.results || [],
					},
				});
			} else if (filterOptions.includes(searchFilter.name)) {
				[`dispatchBy${toPascalCase(searchFilter.name)}`]({
					type: ADD_RESULTS,
					payload: {
						total: response?.data?.total || 0,
						rows: response?.data?.results || [],
					},
				});
			}

			setResult({
				total: response?.data?.total || 0,
				rows: response?.data?.results || [],
			});
		}

		if (characterState.isError) {
			message.error('Oops! Something happened...');
			console.log('Error :', characterState.error);
		}
	}, [characterState.isSuccess]);


	return (
		<CharactersContext.Provider value={{
			favorites,
			state: {
				result,
				isSuccess: characterState.isSuccess,
				isLoading: characterState.isLoading,
				isError: characterState.isError,
			},
			actions: {
				search,
				setFavorites,
			},
		}}
		>
			{children}
		</CharactersContext.Provider>
	);
};
