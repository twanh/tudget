import {
  FETCH_ALL_ACCOUNTS_ERROR,
  FETCH_ALL_ACCOUNTS_SUCCESS,
  FETCH_ALL_ACCOUNTS_PENDING,

  UPDATE_ACCOUNT_SUCCESS,
  UPDATE_ACCOUNT_PENDING,
  UPDATE_ACCOUNT_ERROR,
} from "../actionTypes";


export const initalState = {
  pending: false,
  accounts: [],
  error: null
}

function updateAccounts(state, data) {
  const indx = state.accounts.findIndex(item => item.pk === data.pk)
  return [
    ...state.accounts.slice(0, indx),
    data,
    ...state.account.slice(indx + 1)
  ]
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

    case UPDATE_ACCOUNT_PENDING:
      return {
        ...state,
        pending: true
      }

    case UPDATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        pending: false,
        accounts: updateAccounts(state, action.account)
      }

    case UPDATE_ACCOUNT_ERROR:
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

