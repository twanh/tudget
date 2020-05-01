import {
  fetchAllBudgetsError,
  fetchAllBudgetsPending,
  fetchAllBudgetsSuccess
} from '../actions/budgets'

import { fetchAllBudgets as allBudgetsFetcher } from '../../utils/api/budgets'

export function fetchAllBudgets() {
  return dispatch => {
    dispatch(fetchAllBudgetsPending)
    allBudgetsFetcher
      .then(arr => {
        dispatch(fetchAllBudgetsSuccess(arr))
      })
      .catch(err => {
        dispatch(fetchAllBudgetsError(err))
      })
  }
}