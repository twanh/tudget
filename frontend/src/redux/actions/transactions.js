import {
  FETCH_ALL_TRANSACTIONS_PENDING,
  FETCH_ALL_TRANSACTIONS_ERROR,
  FETCH_ALL_TRANSACTIONS_SUCCESS,

  UPDATE_EXPENSE_ERROR,
  UPDATE_EXPENSE_PENDING,
  UPDATE_EXPENSE_SUCCESS,

  UPDATE_INCOME_ERROR,
  UPDATE_INCOME_PENDING,
  UPDATE_INCOME_SUCCESS,

  ADD_TRANSACTION_ERROR,
  ADD_TRANSACTION_PENDING,
  ADD_TRANSACTION_SUCCESS,

  DELETE_TRANSACTION_PENDING,
  DELETE_TRANSACTION_SUCCESS,
  DELETE_TRANSACTION_ERROR
} from "../actionTypes";

// FETCHING (getting)
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

// UPDATING 

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


export function updateIncomePending() {
  return {
    type: UPDATE_INCOME_PENDING
  }
}

export function updateIncomeSuccess(income) {
  return {
    type: UPDATE_INCOME_SUCCESS,
    income
  }

}

export function updateIncomeError(error) {
  return {
    type: UPDATE_INCOME_ERROR,
    error,
  }
}

// CREATING

export function addTransactionPending() {
  return {
    type: ADD_TRANSACTION_PENDING
  }
}

export function addTransactionSuccess(transaction) {
  return {
    type: ADD_TRANSACTION_SUCCESS,
    transaction,
  }
}

export function addTransactionError(error) {
  return {
    type: ADD_TRANSACTION_ERROR,
    error,
  }
}


// DELETE
export function deleteTransactionPending() {
  return {
    type: DELETE_TRANSACTION_PENDING
  }
}

export function deleteTransactionSuccess(transaction) {
  return {
    type: DELETE_TRANSACTION_SUCCESS,
    pending: false,
    transaction,
  }
}

export function deleteTransactionError(error) {
  return {
    type: DELETE_TRANSACTION_ERROR,
    pending: false,
    error,
  }
}



