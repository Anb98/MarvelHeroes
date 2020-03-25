import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
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
	const [characterPage, setCharacterPage] = useState(1);

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
	const [characterState, fetchCharacter] = useDataApi(makeUrl(`comics/${id}/characters`), undefined, true);
	const [storiesState, fetchStories] = useDataApi(makeUrl(`comics/${id}/stories`), undefined, true);


	useEffect(() => {
		if (characterState.isSuccess) {
			const mainData = characterState.data.data;
			setCharacter({
				total: mainData.total,
				rows: mainData.results,
			});
		}
	}, [characterState.isSuccess, characterState.isError]);

	useEffect(() => {
		if (storiesState.isSuccess) {
			const mainData = comicsState.data.data;
			console.log('storiesState -> mainData', mainData);
		}
	}, [storiesState.isSuccess, storiesState.isError]);


	useEffect(() => {
		if (comicsState.isSuccess) {
			const response = comicsState.data;

			if (response.data.results.length) {
				const mainData = response.data.results[0];
				setComic(mainData);
				setAvatar(`${mainData.thumbnail?.path}/standard_medium.${mainData.thumbnail?.extension}`);

				fetchCharacter({ params: { limit: 5, offset: 0 } });
				fetchStories({ params: { limit: 5, offset: 0 } });
			}
		}

		if (comicsState.isError) {
			if (comicsState.status === 404) {
				message.error(`Oops! This comic doesn't exists`);
				return history.push('/characters');
			}

			message.error('Oops! Something happened...');
			console.log('Error :', comicsState.error);
		}
	}, [comicsState.isSuccess, comicsState.isError]);

	useEffect(() => {
		fetchComics();
	}, []);

	return (
		<Wrapper>
			<StyledPanel title='Comic' favoritable>
				<InfoPanel
					avatar={avatar}
					title={comic.title}
					description={comic.description}
				/>
			</StyledPanel>

			<StyledPanel title='Characters'>
				<List
					loading={characterState.isLoading}
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
						fetchCharacter({ params: { limit: 5, offset } });
						setCharacterPage(page);
					}}
					total={character.total}
					pageSize={5}
				/>
			</StyledPanel>

			<StyledPanel title='Stories'>
				ayuda
			</StyledPanel>

		</Wrapper>
	);
};

const Wrapper = styled.div`
	display:flex;
	flex-wrap:wrap;
`;

export default Id;
