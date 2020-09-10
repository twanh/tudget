import {
  fetchAllAccountsPending, fetchAllAccountsSuccess, fetchAllAccountsError,
  updateAccountPending, updateAccountSuccess, updateAccountError
} from '../actions/accounts'

import { fetchAllAccounts as allAccountFetcher, updateAccount as accountUpdater } from '../../utils/api/accounts'

export function fetchAllAccounts() {
  return dispatch => {
    dispatch(fetchAllAccountsPending())
    allAccountFetcher()
      .then(resp => resp.json())
      .then(jsn => {
        dispatch(fetchAllAccountsSuccess(jsn))
      })
      .catch(err => dispatch(fetchAllAccountsError(err)))
  }
}

export function updateAccount(pk, account) {
  return dispatch => {
    dispatch(updateAccountPending())
    accountUpdater(pk, account)
      .then(resp => resp.json())
      .then(jsn => {
        debugger
        dispatch(updateAccountSuccess(jsn))
      })
      .catch(err => dispatch(updateAccountPending(err)))
  }
}