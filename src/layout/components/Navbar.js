import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { menu } from '@config/general';

const Navbar = ({ actualPath }) => (
	<Wrapper>
		<ul className='navbar'>

			<li className='navbar__header'>
				<img className='navbar__logo' src='/img/logo.svg' alt='logout' />
			</li>

			{
				menu.map((item) => (
					<li
						className={[
							'navbar__item',
							actualPath === item.path && 'navbar__item--selected',
						].filter(Boolean).join(' ')}
						key={item.key}
					>
						<Link to={item.path} className='navbar__link'>
							<img className='navbar__icon' src={item.icon} alt={item.text} />
							<span className='navbar__text'>{item.text}</span>
						</Link>
					</li>
				))
			}

			<li className='navbar__footer'>
				<a
					className='navbar__link navbar__text--footer'
					target='__blank'
					href='http://marvel.com'
				>
					Data provided by Marvel. © 2020 MARVEL
				</a>
			</li>
		</ul>
	</Wrapper>
);

Navbar.propTypes = {
	actualPath: PropTypes.string.isRequired,
};

const Wrapper = styled.nav`
--color:#56546C;

width:var(--nav-width);
height:100vh;
position:fixed;
background: var(--main-color);
border-top-right-radius: 40px;

@media (max-width: 1000px; min-width: 715px;) {
	border-top-right-radius: 30px;
	&:hover{
		width:12rem;
		z-index:10;

		.navbar__text {
			display:block;
		}
	}
}

@media (max-width: 715px) {
	height:initial;
	width:100%;
	bottom:0;
	z-index:10;
	border-top-right-radius: 0px;
}


.navbar{
	list-style:none;
	padding:0;
	margin:0;
	display:flex;
	flex-direction:column;
	align-items:center;
	height:100%;

	@media(max-width: 715px){
		flex-direction:row;
		justify-content: space-evenly;
	}


	&__header {
		padding-top:2em;
		padding-bottom:3.5em;

		@media(max-width: 715px){
			padding:0;
		}
	}

	&__logo {
		--size:4.25em;
		height:var(--size);
		width:var(--size);
	}

	&__item {
		position:relative;
		
		&--selected,
		&:hover {
			border-radius: 25px 0px 0px 25px;
			margin-left: 1.5em;
			width:calc(100% - 1.5em);
			background: var(--secondary-color);
			* {
				filter: invert(69%) 
					sepia(39%)
					saturate(901%)
					hue-rotate(32deg)
					brightness(104%)
					contrast(97%) !important;
			}

			&:not(.navbar__item--selected) {
				opacity:0.7;
			}

			@media (max-width: 715px) {
				width:initial;
				margin-left: 0px;
				border-radius: 0px 0px 25px 25px;
				margin-bottom:1px;
			}
		}
	}

	&__footer {
		position:relative;
		width:100%;
		margin-top:auto;
		background:black;
		@media (max-width: 1000px) {
			display:none;
		}

	}

	&__link {
		padding-right:1em;
		display: flex;
		align-items:center;
		height:4em;
		color:var(--color);

		@media (max-width: 715px) {
			padding-right:0px;
		}
	}
	
	&__icon {
		width:1.75em;
		margin: 0 1.5rem;
		filter: invert(34%)
			sepia(4%) 
			saturate(2442%) 
			hue-rotate(206deg) 
			brightness(91%) 
			contrast(88%);
	}
	
	&__text {
		font-weight:bold;
		display:block;

		&--footer {
			text-align:center;
			font-size:0.75em;
			font-weight:bold;
			color:var(--color);
		}

		@media (max-width: 1000px) {
			display:none;
		}
	}

}
`;

export default Navbar;
