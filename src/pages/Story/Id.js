/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { List, message, Pagination } from 'antd';


import styled from 'styled-components';

import {
	makeUrl, favoriteHandle, getFavorite, getImgPath,
} from '@config/util';
import useDataApi from '@hooks/useDataApi';

import FirstColumn from '@components/FirstColumn';
import InfoPanel from '@components/InfoPanel';
import StyledPanel from '@components/StyledPanel';

const Id = () => {
	const history = useHistory();
	const { id } = useParams();

	const [isFavorite, setIsFavorite] = useState(false);
	const [characterPage, setCharacterPage] = useState(1);
	const [comicsPage, setComicsPage] = useState(1);

	const [story, setStory] = useState({
		title: '',
		originalIssue: { name: '' },
	});

	const [comics, setComics] = useState({
		title: '',
		description: '',
	});
	const [characters, setCharacters] = useState({
		total: 0,
		rows: [],
	});

	const [storyState, fetchStory] = useDataApi(makeUrl(`stories/${id}`), undefined, true);
	const [comicsState, fetchComics] = useDataApi(makeUrl(`stories/${id}/comics`), undefined, true);
	const [charactersState, fetchCharacters] = useDataApi(makeUrl(`stories/${id}/characters`), undefined, true);


	useEffect(() => {
		if (charactersState.isSuccess) {
			const mainData = charactersState.data.data;
			setCharacters({
				total: mainData.total,
				rows: mainData.results,
			});
		}
	}, [charactersState.isSuccess, charactersState.isError]);

	useEffect(() => {
		if (comicsState.isSuccess) {
			const mainData = comicsState.data.data;
			setComics({
				total: mainData.total,
				rows: mainData.results,
			});
		}
	}, [comicsState.isSuccess, comicsState.isError]);


	useEffect(() => {
		if (storyState.isSuccess) {
			const response = storyState.data;

			if (response.data.results.length) {
				const mainData = response.data.results[0];
				setStory(mainData);

				fetchCharacters({ params: { limit: 5, offset: 0 } });
				fetchComics({ params: { limit: 5, offset: 0 } });

				getFavorite('stories', setIsFavorite, id);
			}
		}

		if (storyState.isError) {
			if (storyState.status === 404) {
				message.error(`Oops! This comic doesn't exists`);
				history.push('/stories');
			} else {
				message.error('Oops! Something happened...');
				console.log('Error :', storyState.error);
			}
		}
	}, [storyState.isSuccess, storyState.isError]);

	useEffect(() => {
		fetchStory();
	}, []);

	return (
		<Wrapper>
			<StyledPanel
				title='Story'
				favoritable
				isFavorite={isFavorite}
				onFavorite={favoriteHandle('stories', setIsFavorite, isFavorite, id)}
			>
				<InfoPanel
					isStory
					title={story.title}
					description={story.originalIssue?.name}
				/>
			</StyledPanel>


			<StyledPanel title='Characters'>
				<List
					loading={charactersState.isLoading}
					size='small'
					dataSource={characters.rows}
					renderItem={(item) => (
						<List.Item>
							<FirstColumn
								href={`/characters/${item.id}`}
								title={item.name}
								avatar={getImgPath(`${item.thumbnail?.path}/standard_small.${item.thumbnail?.extension}`)}
							/>
						</List.Item>
					)}
				/>
				<Pagination
					current={characterPage}
					onChange={(page, pageSize) => {
						const offset = (page - 1) * pageSize;
						fetchCharacters({ params: { limit: 5, offset } });
						setCharacterPage(page);
					}}
					total={characters.total}
					pageSize={5}
				/>
			</StyledPanel>


			<StyledPanel title='Comics'>
				<List
					loading={comicsState.isLoading}
					size='small'
					dataSource={comics.rows}
					renderItem={(item) => (
						<List.Item>
							<FirstColumn
								href={`/comics/${item.id}`}
								title={item.title}
								avatar={`${item.thumbnail?.path}/standard_small.${item.thumbnail?.extension}`}
							/>
						</List.Item>
					)}
				/>
				<Pagination
					current={comicsPage}
					onChange={(page, pageSize) => {
						const offset = (page - 1) * pageSize;
						fetchComics({ params: { limit: 5, offset } });
						setComicsPage(page);
					}}
					total={comics.total}
					pageSize={5}
				/>
			</StyledPanel>

		</Wrapper>
	);
};

const Wrapper = styled.div`
	display:flex;
	flex-wrap:wrap;
`;

export default Id;
