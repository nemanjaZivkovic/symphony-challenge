import * as actionTypes from '../actionTypes';

export const languageSet = (languageCode) => ({
	type: actionTypes.LANGUAGE_SET,
	languageCode
});

/* export const languageSet = (languageCode) => {
	return dispatch => {
		dispatch({
			type: actionTypes.LANGUAGE_SET,
			languageCode
		});
	}
}; */

export const languageDisableSet = () => ({
	type: actionTypes.LANGUAGE_DISABLE_SET
});

export const languageDisableUnset = () => ({
	type: actionTypes.LANGUAGE_DISABLE_UNSET
});
