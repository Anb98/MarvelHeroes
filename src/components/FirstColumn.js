import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


const FirstColumn = ({ href, title, avatar }) => (
	<Wrapper
		avatar={avatar}
		to={href}
	>
		<div className='first-column__picture' />
		<span className='first-column__text'>{title}</span>
	</Wrapper>
);

FirstColumn.propTypes = {
	href: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	avatar: PropTypes.string.isRequired,
};

const Wrapper = styled(Link)`
	width:100%;
	display:flex;
	cursor:pointer;
	align-items:center;

	--picture-size: 35px;
	.first-column__picture {
		width:var(--picture-size);
		height:var(--picture-size);
		background: url(${({ avatar }) => avatar}) no-repeat !important;
		border-radius:50%;
		border:2px solid #ffce07;
		background-size:cover !important;
		margin-right:1em;
	}

	.first-column__text {
		color: var(--text-color);
		word-wrap: break-word;
		font-weight:bold;
		width: calc( 100% - (var(--picture-size) + 2px + 1em ));

		&:hover{
			text-decoration:underline;
		}
	}
`;


export default FirstColumn;
