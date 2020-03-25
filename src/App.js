import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from 'react-router-dom';
import Layout from '@layout/Main';

import Comics from '@pages/Comic';
import ComicsId from '@pages/Comic/Id';
import Stories from '@pages/Stories';
import Characters from '@pages/Character';
import CharacterId from '@pages/Character/Id';

import { CacheProvider } from '@contexts/CacheContext';


const App = () => (
	<Router>
		<Layout>
			<CacheProvider>
				<Switch>
					<Route exact path='/characters' component={Characters} />
					<Route path='/characters/:id' component={CharacterId} />
					<Route exact path='/comics' component={Comics} />
					<Route path='/comics/:id' component={ComicsId} />
					<Route path='/stories' component={Stories} />
				</Switch>
			</CacheProvider>
		</Layout>
	</Router>
);

export default App;
