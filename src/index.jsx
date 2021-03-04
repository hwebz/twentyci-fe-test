import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Router, withRouter, Switch, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { delayImport } from 'utils';

import 'styles/index.scss';

import {
	Loading
} from 'components/Loading';
import { 
	LoginContextProvider,
	PostContextProvider
} from 'contexts';

const Home = delayImport(import('pages/Home'));
const Dashboard = delayImport(import('pages/Dashboard'));
const NotFound = delayImport(import('pages/NotFound'));

const customHistory = createBrowserHistory();

const App = () => {
	return (
		<Switch>
			<Route path="/login" exact component={Home}  />
			<Route path="/" exact>
				<Redirect to="/login"/>
			</Route>
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
			<LoginContextProvider>
				<PostContextProvider>
					<Router history={customHistory}>
						<AppRootWithRouter />
					</Router>
				</PostContextProvider>
			</LoginContextProvider>
		</Suspense>
	)
}

ReactDOM.render(
	<React.StrictMode>
		<Root />
	</React.StrictMode>,
	document.getElementById('root')
);