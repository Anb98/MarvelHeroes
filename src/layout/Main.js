import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { menu } from '@config/general';

import Navbar from './components/Navbar';
import Bookmarks from './components/Bookmarks';

const Main = ({ children }) => {
	const [actualPath, setActualPath] = useState('/');
	const [pathname, setPathname] = useState([]);
	const location = useLocation();

	useEffect(() => {
		const actualPage = menu.find((el) => location.pathname.includes(el.path));
		setPathname(location.pathname.split('/'));
		window.scrollTo(0, 0);

		if (actualPage) {
			setActualPath(actualPage.path);
			document.title = `Marvel - ${actualPage.text}`;
		}
	}, [location]);

	return (
		<Body>
			<Navbar actualPath={actualPath} />
			<div className='main-container'>
				{
					!pathname[2]
					&& <Bookmarks type={pathname[1]} />
				}
				{children}
			</div>
		</Body>
	);
};

Main.propTypes = {
	children: PropTypes.node.isRequired,
};

const Body = styled.div`
position:relative;
.main-container{
	margin-left: var(--nav-width);
	padding: 1em 2.5em;
}
`;

export default Main;
