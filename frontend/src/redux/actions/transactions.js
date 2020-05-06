import {
  FETCH_ALL_TRANSACTIONS_PENDING,
  FETCH_ALL_TRANSACTIONS_ERROR,
  FETCH_ALL_TRANSACTIONS_SUCCESS,

  UPDATE_EXPENSE_ERROR,
  UPDATE_EXPENSE_PENDING,
  UPDATE_EXPENSE_SUCCESS
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

export function updateExpensePending() {
  return {
    type: UPDATE_EXPENSE_PENDING
  }
}

export function updateExpenseSuccess(expense) {
  return {
    type: UPDATE_EXPENSE_SUCCESS,
    expense
  }

}

export function updateExpenseError(error) {
  return {
    type: UPDATE_EXPENSE_ERROR,
    error,
  }
}