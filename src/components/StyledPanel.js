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
	margin: 0px 9px 18px;
	padding:1.5em;

	
	@media (max-width: 650px) {
		width: calc(100% - 1.5em);
	}

	header {
		margin-bottom:1.5em;
		display:flex;
		align-items:center;
		justify-content: space-between;
	}

	.panel__text-title {
		color: var(--text-color);
	}

	button {
		background: transparent !important;
		border:0 !important;
		cursor:pointer
	}

	.panel__edit{
		height:2.1em;
		filter: invert(89%) sepia(4%) saturate(2044%) hue-rotate(184deg) brightness(87%) contrast(89%);
	}
`;

export default StyledPanel;
