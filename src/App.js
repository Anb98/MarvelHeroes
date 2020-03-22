import React, { useEffect } from 'react';
import './App.css';
import { makeUrl } from '@config/util';
import axios from 'axios';

function App() {
	const getCharacter = async () => {
		// const {data} = await axios(makeUrl('characters'));
		// console.log('response.data.results :', data.data.results);
	};

	useEffect(() => {
		getCharacter();
	}, []);

	return (
		<div className='App'>
			xd
		</div>
	);
}

export default App;
