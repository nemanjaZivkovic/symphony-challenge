import * as actionTypes from '../actionTypes';

const setLoggedInUser = (state, payload) => {
	return payload.userData;
};

const unsetLoggedInUser = (state, userData) => {
	return null;
};

const reducer = (state = null, action) => {
	switch (action.type) {
		case actionTypes.USER_SET_LOGGED:
			return setLoggedInUser(state, action);
		case actionTypes.USER_UNSET_LOGGED:
			return unsetLoggedInUser(state, action);
		default:
			return state;
	}
};

export default reducer;
