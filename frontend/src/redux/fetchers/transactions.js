import {
  fetchAllTransactionsPending,
  fetchAllTransactionsSuccess,
  fetchAllTransactionsError,
  updateExpenseError,
  updateExpensePending,
  updateExpenseSuccess,
  updateIncomePending,
  updateIncomeSuccess,
  updateIncomeError,
  addTransactionPending,
  addTransactionSuccess,
  addTransactionError,
  deleteTransactionPending,
  deleteTransactionError,
} from '../actions/transactions'

import {
  fetchAllTransactions as allTransactionsFetcher,
  updateExpense as expenseUpdater,
  updateIncome as incomeUpdater,
  addTransaction as transactionAdder,
  deleteTransaction as transactionDeleter
} from '../../utils/api/transactions'

export function fetchAllTransactions() {
  return dispatch => {
    dispatch(fetchAllTransactionsPending())
    allTransactionsFetcher()
      .then(arr => {
        dispatch(fetchAllTransactionsSuccess(arr))
      })
      .catch(err => {
        dispatch(fetchAllTransactionsError(err))
      })
  }
}

export function updateExpense(pk, data) {
  return dispatch => {
    dispatch(updateExpensePending())
    expenseUpdater(pk, data)
      .then(res => res.json())
      .then(exp => {
        dispatch(updateExpenseSuccess(exp))
      })
      .catch(err => {
        dispatch(updateExpenseError(err))
      })
  }
}

export function updateIncome(pk, data) {
  return dispatch => {
    dispatch(updateIncomePending())
    incomeUpdater(pk, data)
      .then(res => res.json())
      .then(inc => {
        dispatch(updateIncomeSuccess(inc))
      })
      .catch(err => {
        dispatch(updateIncomeError(err))
      })
  }
}

export function addTransaction(data) {
  return dispatch => {
    dispatch(addTransactionPending())
    transactionAdder(data)
      .then(res => res.json())
      .then(newT => {
        dispatch(addTransactionSuccess(newT))
      })
      .catch(err => {
        dispatch(addTransactionError(err))
      })
  }
}

export function deleteTransaction(data) {
  return dispatch => {
    dispatch(deleteTransactionPending())
    transactionDeleter(data)
      .then(resp => {
        if (resp.ok) {
          return data
        } else {
          throw 'deleteTransaction went wrong'
        }
      })
      .catch(err => {
        dispatch(deleteTransactionError(err))
      })
  }
}