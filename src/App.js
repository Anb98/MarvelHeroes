import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from 'react-router-dom';
import Layout from '@layout/Main';

import Comics from '@pages/Comics';
import Stories from '@pages/Stories';
import Characters from '@pages/Characters';

import { CharactersProvider } from '@contexts/CharactersContext';


const App = () => (
	<Router>
		<Layout>
			<CharactersProvider>
				<Switch>
					<Route path='/characters' component={Characters} />
					<Route path='/comics' component={Comics} />
					<Route path='/stories' component={Stories} />
				</Switch>
			</CharactersProvider>
		</Layout>
	</Router>
);

export default App;
