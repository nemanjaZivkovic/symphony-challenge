import * as actionTypes from '../actionTypes';

// reducers for auth actions

const initialState = {
	loading: true,
	accessToken: null,
	error: null
};

const authStart = (state) => {
	return {
		...state,
		loading: true
	};
};

const authSuccess = (state, action) => {
	return {
		...state,
		accessToken: action.token,
		loading: false
	};
};

const authFail = (state, action) => {
	return {
		...state,
		accessToken: null,
		loading: false
	};
};

const authLogout = (state, action) => {
	return {
		...state,
		loading: false,
		accessToken: null
	};
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.AUTH_START:
			return authStart(state);
		case actionTypes.AUTH_SUCCESS:
			return authSuccess(state, action);
		case actionTypes.AUTH_FAIL:
			return authFail(state, action);
		case actionTypes.AUTH_LOGOUT:
			return authLogout(state, action);
		default:
			return state;
	}
};

export default reducer;
