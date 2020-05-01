import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from './reducers'

intialState = {} //TODO: Create intial state?

const middlewares = [thunk]

export default createStore(rootReducer, {}, applyMiddleware(...middlewares))