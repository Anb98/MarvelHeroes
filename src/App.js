import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from 'react-router-dom';

import Characters from '@pages/Characters';
import Comics from '@pages/Comics';
import Stories from '@pages/Stories';

const App = () => (
	<Router>
		<Switch>
			<Route path='/characters' component={Characters} />
			<Route path='/comics' component={Comics} />
			<Route path='/stories' component={Stories} />
		</Switch>
	</Router>
);

export default App;
