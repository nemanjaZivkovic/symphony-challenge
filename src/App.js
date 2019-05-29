import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import uuid from 'uuid/v4';
import Loader from './components/UI/Loader/Loader';
import Layout from './components/Layout/Layout';
import SignIn from './containers/Auth/SignIn/SignIn';
import SignUp from './containers/Auth/SignUp/SignUp';
import SignOut from './containers/Auth/SignOut/SignOut';
import Dashboard from './containers/Dashboard/Dashboard';
import Hotel from './containers/Hotel/Hotel';
import Favorites from './containers/Favorites/Favorites';


import { authCheckAutoLogin } from './store/actions/authActions';

const publicRoutes = [
	<Route path="/sign-in" component={SignIn} key={uuid()} />,
	<Route path="/sign-up" component={SignUp} key={uuid()} />
];

const protectedRoutes = [
	<Route path="/dashboard" component={Dashboard} key={uuid()} />,
	<Route path="/sign-out" component={SignOut} key={uuid()} />,
	<Route path="/hotel/:id" component={Hotel} key={uuid()} />,
	<Route path="/favorites" component={Favorites} key={uuid()} />,
];

const scrollToTop = () => {
	window && window.scroll(0, 0);
};

function App(props) {
	const { history, loggedUser, appIsLoading, tryAutoLogin } = props;

	// on initial try to auto login the user by checking the token in local storage
	useEffect(() => {
		tryAutoLogin();

		// scroll to top on each app route change and once on initial load after some waiting
		setTimeout(() => scrollToTop(), 500);
		history.listen(() => {
			scrollToTop();
		});
	}, []);

	return (
		<Layout>
			{appIsLoading ? (
				<Loader/>
			) : (
				<Switch>
					{loggedUser ? protectedRoutes : publicRoutes}
					<Redirect to={loggedUser ? '/dashboard' : '/sign-in'} />
				</Switch>
			)}
		</Layout>
	);
}

const mapStateToProps = (state) => {
	return {
		loggedUser: state.user,
		appIsLoading: state.auth.loading,
		inviteUsers: state.invite
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		tryAutoLogin: () => dispatch(authCheckAutoLogin())
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
