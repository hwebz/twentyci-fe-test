import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Router, withRouter, Switch, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { delayImport } from 'utils';

const Home = delayImport(import('pages/Home'));
const NotFound = delayImport(import('pages/NotFound'));

const customHistory = createBrowserHistory();

const App = () => {
	return (
		<Switch>
			<Route path="/" exact component={Home} />
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
		<Suspense fallback={<p>Loading...</p>}>
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