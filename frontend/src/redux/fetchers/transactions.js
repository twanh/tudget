import {
  fetchAllTransactionsPending,
  fetchAllTransactionsSuccess,
  fetchAllTransactionsError
} from '../actions/transactions'

import { fetchAllTransactions as allTransactionsFetcher } from '../../utils/api/transactions'

export function fetchAllTransactions() {
  return dispatch => {
    dispatch(fetchAllTransactionsPending)
    allTransactionsFetcher()
      .then(arr => {
        dispatch(fetchAllTransactionsSuccess(arr))
      })
      .catch(err => {
        dispatch(fetchAllTransactionsError(err))
      })
  }
}