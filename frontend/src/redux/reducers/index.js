import { combineReducers } from 'redux'

// Import reducers here
import { accountsReducer, getAllAccounts, getAllAccountsPending, getAllAccountsError, initalState as accountsState } from "./accounts";
import { budgetsReducer, getAllBudgets, getAllBudgetsError, getAllBudgetsPending, initalState as budgetsState } from './budgets'
import { transactionsReducer, getAllTransactions, getAllTransactionsPending, getAllTransactionsError, initalState as transactionsState } from "./transactions";
import { categoriesReducer, getAllCategories, getAllCategoriesPending, getAllCategoriesError, initialState as categoriesInitalState } from "./categories";

export let intialState = {
  accountsReducer: {
    ...accountsState
  },
  budgetsReducer: {
    ...budgetsState
  },
  transactionsReducer: {
    ...transactionsState
  },
  categoriesReducer: {
    ...categoriesInitalState
  }
} //TODO: Create intial state?

export {
  getAllAccounts, getAllAccountsPending, getAllAccountsError,
  getAllBudgets, getAllBudgetsPending, getAllBudgetsError,
  getAllTransactions, getAllTransactionsPending, getAllTransactionsError,
  getAllCategories, getAllCategoriesPending, getAllCategoriesError,
}


export default combineReducers({ accountsReducer, budgetsReducer, transactionsReducer, categoriesReducer })