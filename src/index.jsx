import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Router, withRouter, Switch, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { delayImport } from 'utils';

import 'styles/index.scss';

import {
	Loading
} from 'components/Loading';

const Home = delayImport(import('pages/Home'));
const Dashboard = delayImport(import('pages/Dashboard'));
const NotFound = delayImport(import('pages/NotFound'));

const customHistory = createBrowserHistory();

const App = () => {
	return (
		<Switch>
			<Route path="/" exact component={Home} />
			<Route path="/dashboard" exact component={Dashboard} />
			<Route path="/not-found" exact component={NotFound} />
			<Route path="*">
				<Redirect to="/not-found" />
			</Route>
		</Switch>
	);
};

const AppRootWithRouter = withRouter(App);

const Root = () => {
	return (
		<Suspense fallback={<Loading />}>
			<Router history={customHistory}>
				<AppRootWithRouter />
			</Router>
		</Suspense>
	)
}

ReactDOM.render(
	<React.StrictMode>
		<Root />
	</React.StrictMode>,
	document.getElementById('root')
);