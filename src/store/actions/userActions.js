import * as actionTypes from '../actionTypes';

export const setLoggedInUser = (userData) => {
/* 	return (dispatch) => ({
		type: actionTypes.USER_SET_LOGGED,
		userData: userData
	}); */

	return {
		type: actionTypes.USER_SET_LOGGED,
		userData: userData
	};
};

export const unsetLoggedUser = () => {
	return {
		type: actionTypes.USER_UNSET_LOGGED
	};
};