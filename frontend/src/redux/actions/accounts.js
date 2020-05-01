import {
  FETCH_ALL_ACCOUNTS_ERROR,
  FETCH_ALL_ACCOUNTS_SUCCESS,
  FETCH_ALL_ACCOUNTS_ERROR,
  FETCH_ALL_ACCOUNTS_PENDING
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