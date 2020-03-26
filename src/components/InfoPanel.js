import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const InfoPanel = ({
	title,
	avatar,
	description,
	isStory,
}) => (
	<Wrapper avatar={avatar}>
		<div className='info__header'>
			{
				!isStory
			&& <div className='info__avatar' />
			}
			<h1 className='info__nombre'>{title}</h1>
		</div>

		<div>

			<label className='info__label'>
				<strong>
					{
						isStory
							? 'Original Issue'
							: 'Description'
					}

				</strong>
			</label>
			<div className='info__descripcion'>
				{ description || isStory ? 'No original issue 😢' : 'No description 😢'}
			</div>
		</div>
	</Wrapper>
);

InfoPanel.defaultProps = {
	description: '',
	avatar: '',
	isStory: false,
};

InfoPanel.propTypes = {
	title: PropTypes.string.isRequired,
	avatar: PropTypes.string,
	description: PropTypes.string,
	isStory: PropTypes.bool,
};

const Wrapper = styled.div`
	--avatar-size: 6em;

	.info__header {
		display:flex;
		align-items:center;
	}
	
	.info__avatar {
		border:3px solid #ffce07;
		width:var(--avatar-size);
		height:var(--avatar-size);
		background: url(${({ avatar }) => avatar}) no-repeat !important;
		border-radius:50%;
		background-size:cover !important;
	}

	.info__nombre {
		word-wrap: break-word;
		margin-left:0.5em;
		border: 0;
		font-weight: bold;
		color: var(--text-color);
		font-size: 2em;
		flex:1;
		width: calc( 100% - var(--avatar-size) - 0.5em);
	}

	.info__descripcion {
		color: var(--text-color);
	}

	.info__label {
		display:block;
		padding-top:1em;
		color: var(--text-color);
		font-size:1.1em;
	}
`;

export default InfoPanel;
