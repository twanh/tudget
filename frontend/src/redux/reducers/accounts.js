import {
  FETCH_ALL_ACCOUNTS_ERROR,
  FETCH_ALL_ACCOUNTS_SUCCESS,
  FETCH_ALL_ACCOUNTS_PENDING
} from "../actionTypes";


export const initalState = {
  pending: false,
  accounts: [],
  error: null
}

export function accountsReducer(state = initalState, action) {
  switch (action.type) {
    case FETCH_ALL_ACCOUNTS_PENDING:
      return {
        ...state,
        pending: true
      }
    case FETCH_ALL_ACCOUNTS_SUCCESS:
      return {
        ...state,
        pending: false,
        accounts: action.accounts
      }
    case FETCH_ALL_ACCOUNTS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      }
    default:
      return state
  }
}


export const getAllAccounts = state => state.accountsReducer.accounts
export const getAllAccountsPending = state => state.accountsReducer.pending
export const getAllAccountsError = state => state.accountsReducer.error

