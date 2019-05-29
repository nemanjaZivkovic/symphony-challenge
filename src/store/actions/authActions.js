import * as actionTypes from '../actionTypes';
import { setLoggedInUser, unsetLoggedUser } from '../actions/userActions';

const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	};
};

export const authSuccess = (token) => {
	localStorage.setItem('token', token);
	return {
		type: actionTypes.AUTH_SUCCESS,
		token
	};
};

export const authSignIn = (token, userData) => {
	return (dispatch) => {
		// temporary fix as there is no /user endpoint saving the user email locally
		// to be used in the header after auto-login
		localStorage.setItem('email', userData.email);
		// end of temporary fix block, @TODO remove this local saving after api is updated and fetch the user after initial app load
		dispatch(setLoggedInUser(userData));
		dispatch(authSuccess(token));
	};
};

export const authCheckAutoLogin = () => {
	return (dispatch) => {
		const token = localStorage.getItem('token');
		if (token) {
		/* 	there is no user endpoint so nothing to fetch here
			we will use user email from the local storage
			until api is updated */
			dispatch(setLoggedInUser({email: localStorage.getItem('email')}));
			dispatch(authSuccess(token));
		} else {
			dispatch(logoutUser());
		}
	};
};

const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAIL,
		error
	};
};

const logout = () => {
	localStorage.removeItem('token');
	// @TODO remove this line after api update (adding /user endpoint);
	localStorage.removeItem('email');
	return {
		type: actionTypes.AUTH_LOGOUT
	};
};

export const logoutUser = () => {
	return (dispatch) => {
		dispatch(logout());
		dispatch(unsetLoggedUser());
	};
};
