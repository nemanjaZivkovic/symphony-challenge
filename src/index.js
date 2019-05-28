import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import './index.scss';
import App from './App';
import languageReducer from './store/reducers/languageReducer';

/* const rootReducer = combineReducers({
	auth: authReducer,
	user: userReducer,
}); */

//redux dev-tools variable https://github.com/zalmoxisus/redux-devtools-extension#usage with fallback option to default compose
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(languageReducer, composeEnhancers(applyMiddleware(thunk)));

const app = (
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
);

ReactDOM.render(app, document.getElementById('root'));
