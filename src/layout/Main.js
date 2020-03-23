import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Navbar from './components/Navbar';

const Main = ({ title, children }) => {
	useEffect(() => {
		document.title = title;
	}, []);

	return (
		<Body>
			<Navbar />
			<div className='main-container'>
				{children}
			</div>
		</Body>
	);
};

Main.propTypes = {
	title: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
};

const Body = styled.div`
.main-container{
	margin-left: var(--nav-width);
	padding: 0 2.5em;
}
`;

export default Main;
