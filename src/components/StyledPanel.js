import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledPanel = ({
	title,
	children,
	favoritable,
	isFavorite,
	onFavorite,
}) => (
	<Wrapper>
		<header>
			<h2 className='panel__text-title'>{title}</h2>
			{
				favoritable
				&& (
					<button type='button' onClick={onFavorite}>
						<img
							className='panel__edit'
							alt='edit'
							src={isFavorite ? '/icon/star.svg' : '/icon/star_border.svg'}
						/>
					</button>
				)

			}
		</header>
		<div className='panel__content'>
			{children}
		</div>
	</Wrapper>
);

StyledPanel.defaultProps = {
	favoritable: false,
	isFavorite: false,
	onFavorite: () => {},
};

StyledPanel.propTypes = {
	title: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
	favoritable: PropTypes.bool,
	isFavorite: PropTypes.bool,
	onFavorite: PropTypes.func,
};

const Wrapper = styled.div`
	width:calc( 50% - 1.5em);
	background:var(--bg-color);
	border-radius:9px;
	margin: 18px 9px;
	padding:1.5em;

	header {
		margin-bottom:1.5em;
		display:flex;
		align-items:center;
		justify-content: space-between;
	}

	.panel__text-title {
		color: #afbed3;
	}

	button {
		background: transparent !important;
		border:0 !important;
		cursor:pointer
	}

	.panel__edit{
		height:2.1em;
	}
`;

export default StyledPanel;
