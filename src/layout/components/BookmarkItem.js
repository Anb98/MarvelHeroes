import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const BookmarkItem = ({
	picture, title, description, href,
}) => (
	<Wrapper picture={picture} to={href}>
		{
			picture
			&& <div className='bookmark-item__picture' />
		}
		<h3 className='bookmark-item__title'>{title}</h3>
		<p className='bookmark-item__description'>{description}</p>
	</Wrapper>
);

BookmarkItem.defaultProps = {
	picture: '',
	description: '',
};

BookmarkItem.propTypes = {
	picture: PropTypes.string,
	title: PropTypes.string.isRequired,
	href: PropTypes.string.isRequired,
	description: PropTypes.string,
};

const Wrapper = styled(Link)`
display:inline-block;
position: relative;
background: var(--bg-color);
border-radius: 15px;
padding:1em;
margin: 2em 0.5em 1em 0.5em;

width: calc(25% - 1em);

	--picture-size: 55px;
	.bookmark-item__picture {
		position:absolute;
		top:-2em;
		right:5px;
		width:var(--picture-size);
		height:var(--picture-size);
		background: url(${({ picture }) => picture}) no-repeat var(--bg-color) !important;
		border-radius:50%;
		${''}
		background-size:cover !important;
		margin-right:1em;
	}

	.bookmark-item__title {
		color: var(--text-color);
		word-wrap: break-word;
		font-weight:bold;
		width: calc( 100% - (var(--picture-size) + 2px + 1em ));
	}

`;

export default BookmarkItem;
