import React,
{
	lazy,
	Suspense,
} from 'react';
import {
	BrowserRouter as Router,
	Redirect,
	Switch,
	Route,
} from 'react-router-dom';
import Layout from '@layout/Main';

import { CacheProvider } from '@contexts/CacheContext';

import Loading from '@pages/Loading';

const Comics = lazy(() => import('@pages/Comic'));
const ComicsId = lazy(() => import('@pages/Comic/Id'));
const Stories = lazy(() => import('@pages/Story'));
const StoriesId = lazy(() => import('@pages/Story/Id'));
const Characters = lazy(() => import('@pages/Character'));
const CharacterId = lazy(() => import('@pages/Character/Id'));


const App = () => (
	<Router>
		<Layout>
			<CacheProvider>
				<Suspense fallback={<Loading />}>
					<Switch>
						<Redirect exact from='/' to='characters' />
						<Route exact path='/characters' component={Characters} />
						<Route path='/characters/:id' component={CharacterId} />
						<Route exact path='/comics' component={Comics} />
						<Route path='/comics/:id' component={ComicsId} />
						<Route exact path='/stories' component={Stories} />
						<Route path='/stories/:id' component={StoriesId} />
					</Switch>
				</Suspense>
			</CacheProvider>
		</Layout>
	</Router>
);

export default App;
