/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Empty } from 'antd';

import { makeUrl, renderDescription, getImgPath } from '@config/util';
import useDataApi from '@hooks/useDataApi';

import BookmarkItem from './BookmarkItem';

const Bookmarks = ({ type }) => {
	const [bookmarksId, setBookmarksId] = useState([]);
	const [bookmarksData, setBookmarksData] = useState([]);
	const [bookmarkState, fetchBookmark] = useDataApi(makeUrl(type), undefined, true);

	const getBookmarks = () => {
		const stringIds = localStorage.getItem(type);
		if (stringIds) {
			const ids = JSON.parse(stringIds);
			if (Array.isArray(ids) && ids.length) {
				setBookmarksId(ids);
				fetchBookmark({ url: makeUrl(`${type}/${ids[0]}`) });
			}
		}
	};

	const getValue = (property, data) => {
		if (['characters', 'comics'].includes(type)) {
			switch (property) {
			case 'picture':
				return getImgPath(`${data.thumbnail?.path}/standard_medium.${data.thumbnail?.extension}`);
			case 'title':
				return type === 'characters' ? data.name : data.title;
			case 'description':
				return renderDescription(data.description);
			default:
				return `/${type}/${data.id}`;
			}
		} else {
			switch (property) {
			case 'title':
				return data.originalIssue?.name;
			case 'description':
				return renderDescription(data.title);
			case 'href':
				return `/${type}/${data.id}`;
			default:
				return '';
			}
		}
	};

	useEffect(() => {
		if (bookmarkState.isSuccess) {
			const result = bookmarkState.data?.data?.results?.[0];
			setBookmarksData((prevState) => ([...prevState, {
				id: result.id,
				picture: getValue('picture', result),
				title: getValue('title', result),
				description: getValue('description', result),
				href: getValue('href', result),
			}]));

			if (bookmarksId.length !== bookmarksData.length + 1) {
				fetchBookmark({ url: makeUrl(`${type}/${bookmarksId[bookmarksData.length + 1]}`) });
			}
		}
	}, [bookmarkState.isSuccess, bookmarkState.isError]);


	useEffect(() => {
		if (type) {
			setBookmarksId([]);
			setBookmarksData([]);
			getBookmarks();
		}
	}, [type]);

	return (
		<Wrapper hasBookmarks={!!bookmarksData.length}>
			<div className='bookmarks__header'>
				<img src='/icon/star_border.svg' alt='star' className='bookmarks__icon' />
				<h2 className='bookmarks__title'>Favorites</h2>

			</div>

			<div className='bookmarks__body'>
				{
					bookmarksData.length
						? bookmarksData.map((el) => (
							<BookmarkItem key={el.id} {...el} />
						))
						: <Empty />
				}
			</div>

			<div className='bookmarks__footer'>
				{/* <Pagination
				current={comicPage}
				onChange={(page, pageSize) => {
					const offset = (page - 1) * pageSize;
					fetchComics({ params: { limit: 5, offset } });
					setComicPage(page);
				}}
					total={100}
					pageSize={5}
				/> */}
			</div>
		</Wrapper>
	);
};

Bookmarks.defaultProps = {
	type: '',
};

Bookmarks.propTypes = {
	type: PropTypes.string,
};

const Wrapper = styled.div`
	.bookmarks__header {
		display:flex;
		align-items:center;
	}
	
	.bookmarks__icon {
		filter: invert(89%) sepia(4%) saturate(2044%) hue-rotate(184deg) brightness(87%) contrast(89%);
	}

	.bookmarks__title {
		color: var(--text-color);
		margin-bottom:0px;
		margin-left:0.5em;
	}

	.bookmarks__body{
		display:flex;
		flex-wrap:wrap;
		justify-content: ${({ hasBookmarks }) => !hasBookmarks && 'center'};
	}

	.bookmarks__footer{
		margin-bottom:2em;
	}

	.ant-empty-description{
		color: var(--text-color) !important;
	}
`;

export default Bookmarks;
