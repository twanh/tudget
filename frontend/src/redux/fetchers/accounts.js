import { fetchAllAccountsPending, fetchAllAccountsSuccess, fetchAllAccountsError } from '../actions/accounts'

import { fetchAllAccounts as allAccountFetcher } from '../../utils/api/accounts'

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