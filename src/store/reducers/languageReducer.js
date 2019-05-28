import * as actionTypes from '../actionTypes';

const initialState = {
	selectedLanguage: 'US',
	disabledChangeLanguage: false
};

const languageSet = (state, { languageCode }) => ({ ...state, selectedLanguage: languageCode });

const languageDisableSet = (state) => ({ ...state, disabledChangeLanguage: true });

const languageDisableUnset = (state) => ({ ...state, disabledChangeLanguage: false });

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.LANGUAGE_SET:
			return languageSet(state, action);
		case actionTypes.LANGUAGE_DISABLE_SET:
			return languageDisableSet(state);
		case actionTypes.LANGUAGE_DISABLE_UNSET:
			return languageDisableUnset(state);
		default:
			return state;
	}
};

export default reducer;
