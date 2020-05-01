import {
  FETCH_ALL_BUDGETS_ERROR,
  FETCH_ALL_BUDGETS_PENDING,
  FETCH_ALL_BUDGETS_SUCCESS
} from '../actionTypes'

export function fetchAllBudgetsPending() {
  return {
    type: FETCH_ALL_BUDGETS_PENDING
  }
}

export function fetchAllBudgetsSuccess(budgets) {
  return {
    type: FETCH_ALL_BUDGETS_SUCCESS,
    budgets: budgets
  }
}
export function fetchAllBudgetsError(error) {
  return {
    type: FETCH_ALL_BUDGETS_ERROR,
    error: error
  }
}
