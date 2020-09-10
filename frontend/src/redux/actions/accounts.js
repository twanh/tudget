import {
  FETCH_ALL_ACCOUNTS_ERROR,
  FETCH_ALL_ACCOUNTS_SUCCESS,
  FETCH_ALL_ACCOUNTS_PENDING,

  UPDATE_ACCOUNT_SUCCESS,
  UPDATE_ACCOUNT_PENDING,
  UPDATE_ACCOUNT_ERROR,
} from "../actionTypes";

export function fetchAllAccountsPending() {
  return {
    type: FETCH_ALL_ACCOUNTS_PENDING
  }
}

export function fetchAllAccountsSuccess(accounts) {
  return {
    type: FETCH_ALL_ACCOUNTS_SUCCESS,
    accounts: accounts
  }
}

export function fetchAllAccountsError(error) {
  return {
    type: FETCH_ALL_ACCOUNTS_ERROR,
    error: error
  }
}


// UPDATE ACTIONS

export function updateAccountPending() {
  return {
    type: UPDATE_ACCOUNT_PENDING
  }
}

export function updateAccountSuccess(account) {
  return {
    type: UPDATE_ACCOUNT_SUCCESS,
    account,
  }
}

export function updateAccountError(error) {
  return {
    type: UPDATE_ACCOUNT_ERROR,
    error,
  }
}