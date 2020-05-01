import {
  FETCH_ALL_TRANSACTIONS_PENDING,
  FETCH_ALL_TRANSACTIONS_ERROR,
  FETCH_ALL_TRANSACTIONS_SUCCESS
} from "../actionTypes";

export function fetchAllTransactionsPending() {
  return {
    type: FETCH_ALL_TRANSACTIONS_PENDING
  }
}

export function fetchAllTransactionsSuccess(transactions) {
  return {
    type: FETCH_ALL_TRANSACTIONS_SUCCESS,
    transactions,
  }
}

export function fetchAllTransactionsError(error) {
  return {
    type: FETCH_ALL_TRANSACTIONS_ERROR,
    error,
  }
}
