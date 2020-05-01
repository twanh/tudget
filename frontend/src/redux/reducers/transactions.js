import {
  FETCH_ALL_TRANSACTIONS_PENDING,
  FETCH_ALL_TRANSACTIONS_ERROR,
  FETCH_ALL_TRANSACTIONS_SUCCESS
} from "../actionTypes";


const initalState = {
  pending: false,
  transactions: [],
  error: null
}

export function transactionsReducer(state = initalState, action) {
  switch (action.type) {
    case FETCH_ALL_TRANSACTIONS_PENDING:
      return {
        ...state,
        pending: true
      }
    case FETCH_ALL_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        pending: false,
        transactions: action.transactions
      }
    case FETCH_ALL_TRANSACTIONS_ERROR:
      return {
        ...state,
        error: action.error
      }
    default:
      return state
  }
}