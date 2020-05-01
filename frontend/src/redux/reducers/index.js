import { combineReducers } from 'redux'

// Import reducers here
import { accountsReducer } from "./accounts";
import { budgetsReducer } from './budgets'
import { transactionsReducer } from "./transactions";


export default combineReducers({ accountsReducer, budgetsReducer, transactionsReducer })