import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { List, message, Pagination } from 'antd';


import styled from 'styled-components';

import { makeUrl } from '@config/util';
import useDataApi from '@hooks/useDataApi';

import FirstColumn from '@components/FirstColumn';
import InfoPanel from '@components/InfoPanel';
import StyledPanel from '@components/StyledPanel';

const Id = () => {
	const history = useHistory();
	const { id } = useParams();

	const [avatar, setAvatar] = useState('');
	const [comicPage, setComicPage] = useState(1);
	const [storiesPage, setStoriesPage] = useState(1);

	const [character, setCharacter] = useState({
		name: '',
		description: '',
	});
	const [comics, setCommics] = useState({
		total: 0,
		rows: [],
	});
	const [stories, setStories] = useState({
		total: 0,
		rows: [],
	});

	const [characterState, fetchCharacter] = useDataApi(makeUrl(`characters/${id}`), undefined, true);
	const [comicsState, fetchComics] = useDataApi(makeUrl(`characters/${id}/comics`), undefined, true);
	const [storiesState, fetchStories] = useDataApi(makeUrl(`characters/${id}/stories`), undefined, true);


	useEffect(() => {
		if (comicsState.isSuccess) {
			const mainData = comicsState.data.data;

			setCommics({
				total: mainData.total,
				rows: mainData.results,
			});
		}
	}, [comicsState.isSuccess, comicsState.isError]);

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
		if (characterState.isSuccess) {
			const response = characterState.data;

			if (response.data.results.length) {
				const mainData = response.data.results[0];
				setCharacter(mainData);
				setAvatar(`${mainData.thumbnail?.path}/standard_medium.${mainData.thumbnail?.extension}`);

				fetchComics({ params: { limit: 5, offset: 0 } });
				fetchStories({ params: { limit: 5, offset: 0 } });
			}
		}

		if (characterState.isError) {
			if (characterState.status === 404) {
				message.error(`Oops! This character doesn't exists`);
				history.push('/characters');
			} else {
				message.error('Oops! Something happened...');
				console.log('Error :', characterState.error);
			}
		}
	}, [characterState.isSuccess, characterState.isError]);

	useEffect(() => {
		fetchCharacter();
	}, []);

	return (
		<Wrapper avatar={avatar}>
			<StyledPanel title='Character' favoritable>
				<InfoPanel
					avatar={avatar}
					title={character.name}
					description={character.description}
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
					current={comicPage}
					onChange={(page, pageSize) => {
						const offset = (page - 1) * pageSize;
						fetchComics({ params: { limit: 5, offset } });
						setComicPage(page);
					}}
					total={comics.total}
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
						fetchStories({ params: { limit: 5, offset } });
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
