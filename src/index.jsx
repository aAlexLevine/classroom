import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import rootReducer from './reducers/rootReducer';
import App from './components/app.jsx';
import { composeWithDevTools } from 'redux-devtools-extension';
import setAuthorizationToken from './utils/setAuthorizationToken';
import jwt from 'jsonwebtoken';
import { setCurrentUser } from './actions/index';

import { Router } from 'react-router-dom';
import { browserHistory } from 'react-router';
import {syncHistoryWithStore } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import NavigationBar from './components/NavigationBar.jsx';

//const logger = createLogger();


const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunk)
))

const history = syncHistoryWithStore(createBrowserHistory(), store);

if (localStorage.jwtToken) {
	setAuthorizationToken(localStorage.jwtToken);
	store.dispatch(setCurrentUser( jwt.decode(localStorage.jwtToken)));
} 

ReactDOM.render(
	<Provider store={store}>
		<NavigationBar history={history} />
	</Provider>,
	document.getElementById('app')
)
