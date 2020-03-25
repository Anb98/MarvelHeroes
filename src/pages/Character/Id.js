import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { message } from 'antd';


import styled from 'styled-components';

import { makeUrl } from '@config/util';
import useDataApi from '@hooks/useDataApi';
import StyledPanel from '@components/StyledPanel';

const Id = () => {
	const history = useHistory();
	const { id } = useParams();

	const [avatar, setAvatar] = useState('');
	const [character, setCharacter] = useState({
		name: '',
		description: '',
	});

	const [characterState, fetchCharacter] = useDataApi(makeUrl(`characters/${id}`), undefined, true);
	const [comicsState, fetchComics] = useDataApi(makeUrl(`characters/${id}/comics`), undefined, true);
	const [storiesState, fetchStories] = useDataApi(makeUrl(`characters/${id}/stories`), undefined, true);


	useEffect(() => {
		if (characterState.isSuccess) {
			const response = characterState.data;

			console.log('Id -> response', response);
			if (response.data.results.length) {
				const mainData = response.data.results[0];
				setCharacter(mainData);
				setAvatar(`${mainData.thumbnail?.path}/standard_medium.${mainData.thumbnail?.extension}`);
			}
		}

		if (characterState.isError) {
			if (characterState.status === 404) {
				message.error(`Oops! This character doesn't exists`);
				return history.push('/characters');
			}

			message.error('Oops! Something happened...');
			console.log('Error :', characterState.error);
		}
	}, [characterState.isSuccess, characterState.isError]);

	useEffect(() => {
		fetchCharacter();
	}, []);

	return (
		<Wrapper avatar={avatar}>
			<StyledPanel title='Character' favoritable>
				<div className='info'>
					<div className='info__header'>
						<div className='info__avatar' />
						<h1 className='info__nombre'>{character.name}</h1>
					</div>

					<div>
						<label className='info__label'>Description</label>
						<div className='info__descripcion'>
							{ character.description ? character.description : 'No description 😢'}
						</div>
					</div>
				</div>
			</StyledPanel>

			<StyledPanel title='Comics'>
				ayuda
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

	.panel {
		width:calc( 50% - 1.5em);
		background: var(--bg-color);
		border-radius:9px;
		margin: 18px 9px;
		padding:1.5em 1.5em 2em 1.5em;
	}

	.info {
		--avatar-size: 6em;
		&__header {
			display:flex;
			align-items:center;
		}
		
		&__avatar {
			border:3px solid #ffce07;
			width:var(--avatar-size);
			height:var(--avatar-size);
			background: url(${({ avatar }) => avatar}) no-repeat !important;
			border-radius:50%;
			background-size:cover !important;
		}

		&__nombre {
			word-wrap: break-word;
			margin-left:0.5em;
			border: 0;
			font-weight: bold;
			color: black;
			font-size: 2em;
			flex:1;
			width: calc( 100% - var(--avatar-size) - 0.5em);
		}

		&__descripcion {
			color: var(--text-color);
		}

		&__label {
			display:block;
			padding-top:1em;
			color: black;
			font-weight:bold;
		}
	}
`;

export default Id;
