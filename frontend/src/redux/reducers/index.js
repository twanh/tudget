import { combineReducers } from 'redux'

// Import reducers here
import { accountsReducer } from "./accounts";
import { budgetsReducer } from './budgets'


export default combineReducers({ accountsReducer, budgetsReducer })