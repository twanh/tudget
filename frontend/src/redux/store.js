import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { composeWithDevTools } from 'redux-devtools-extension';


import rootReducer, { intialState } from './reducers'
// import { initalState as accntInitalState } from './reducers/accounts';

const middlewares = [thunk]

export default createStore(rootReducer, intialState, composeWithDevTools(applyMiddleware(...middlewares)))