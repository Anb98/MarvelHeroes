import React from 'react';
import {
	BrowserRouter as Router,
	Redirect,
	Switch,
	Route,
} from 'react-router-dom';
import Layout from '@layout/Main';

import Comics from '@pages/Comic';
import ComicsId from '@pages/Comic/Id';
import Stories from '@pages/Story';
import StoriesId from '@pages/Story/Id';
import Characters from '@pages/Character';
import CharacterId from '@pages/Character/Id';

import { CacheProvider } from '@contexts/CacheContext';


const App = () => (
	<Router>
		<Layout>
			<CacheProvider>
				<Switch>
					<Redirect exact from='/' to='characters' />
					<Route exact path='/characters' component={Characters} />
					<Route path='/characters/:id' component={CharacterId} />
					<Route exact path='/comics' component={Comics} />
					<Route path='/comics/:id' component={ComicsId} />
					<Route exact path='/stories' component={Stories} />
					<Route path='/stories/:id' component={StoriesId} />
				</Switch>
			</CacheProvider>
		</Layout>
	</Router>
);

export default App;
