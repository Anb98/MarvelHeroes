/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { List, message, Pagination } from 'antd';


import styled from 'styled-components';

import { makeUrl, favoriteHandle, getFavorite } from '@config/util';
import useDataApi from '@hooks/useDataApi';

import FirstColumn from '@components/FirstColumn';
import InfoPanel from '@components/InfoPanel';
import StyledPanel from '@components/StyledPanel';

const Id = () => {
	const history = useHistory();
	const { id } = useParams();

	const [isFavorite, setIsFavorite] = useState(false);
	const [avatar, setAvatar] = useState('');
	const [characterPage, setCharacterPage] = useState(1);
	const [storiesPage, setStoriesPage] = useState(1);

	const [comic, setComic] = useState({
		title: '',
		description: '',
	});
	const [character, setCharacter] = useState({
		total: 0,
		rows: [],
	});
	const [stories, setStories] = useState({
		total: 0,
		rows: [],
	});

	const [comicsState, fetchComics] = useDataApi(makeUrl(`comics/${id}`), undefined, true);
	const [charactersState, fetchCharacters] = useDataApi(makeUrl(`comics/${id}/characters`), undefined, true);
	const [storiesState, fetchStories] = useDataApi(makeUrl(`comics/${id}/stories`), undefined, true);


	useEffect(() => {
		if (charactersState.isSuccess) {
			const mainData = charactersState.data.data;
			setCharacter({
				total: mainData.total,
				rows: mainData.results,
			});
		}
	}, [charactersState.isSuccess, charactersState.isError]);

	useEffect(() => {
		if (storiesState.isSuccess) {
			const mainData = storiesState.data.data;
			setStories({
				total: mainData.total,
				rows: mainData.results,
			});
		}
	}, [storiesState.isSuccess, storiesState.isError]);


	useEffect(() => {
		if (comicsState.isSuccess) {
			const response = comicsState.data;

			if (response.data.results.length) {
				const mainData = response.data.results[0];
				setComic(mainData);
				setAvatar(`${mainData.thumbnail?.path}/standard_medium.${mainData.thumbnail?.extension}`);

				fetchCharacters({ params: { limit: 5, offset: 0 } });
				fetchStories({ params: { limit: 5, offset: 0 } });

				getFavorite('comics', setIsFavorite, id);
			}
		}

		if (comicsState.isError) {
			if (comicsState.status === 404) {
				message.error(`Oops! This comic doesn't exists`);
				history.push('/comics');
			} else {
				message.error('Oops! Something happened...');
				console.log('Error :', comicsState.error);
			}
		}
	}, [comicsState.isSuccess, comicsState.isError]);

	useEffect(() => {
		fetchComics();
	}, []);

	return (
		<Wrapper>
			<StyledPanel
				title='Comic'
				favoritable
				isFavorite={isFavorite}
				onFavorite={favoriteHandle('comics', setIsFavorite, isFavorite, id)}
			>
				<InfoPanel
					avatar={avatar}
					title={comic.title}
					description={comic.description}
				/>
			</StyledPanel>

			<StyledPanel title='Characters'>
				<List
					loading={charactersState.isLoading}
					size='small'
					dataSource={character.rows}
					renderItem={(item) => (
						<List.Item>
							<FirstColumn
								href={`/characters/${item.id}`}
								title={item.name}
								avatar={`${item.thumbnail?.path}/standard_small.${item.thumbnail?.extension}`}
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
					total={character.total}
					pageSize={5}
				/>
			</StyledPanel>

			<StyledPanel title='Stories'>
				<List
					loading={storiesState.isLoading}
					size='small'
					dataSource={stories.rows}
					renderItem={(item) => (
						<List.Item>
							<Link to={`/stories/${item.id}`}>
								{item.title}
							</Link>
						</List.Item>
					)}
				/>
				<Pagination
					current={storiesPage}
					onChange={(page, pageSize) => {
						const offset = (page - 1) * pageSize;
						fetchCharacters({ params: { limit: 5, offset } });
						setStoriesPage(page);
					}}
					total={stories.total}
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
