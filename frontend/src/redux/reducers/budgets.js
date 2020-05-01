import {
  FETCH_ALL_BUDGETS_ERROR,
  FETCH_ALL_BUDGETS_PENDING,
  FETCH_ALL_BUDGETS_SUCCESS
} from '../actionTypes'

export const initalState = {
  pending: false,
  budgets: [],
  error: null
}

export function budgetsReducer(state = initalState, action) {
  switch (action.type) {
    case FETCH_ALL_BUDGETS_PENDING:
      return {
        ...state,
        pending: true
      }
    case FETCH_ALL_BUDGETS_SUCCESS:
      return {
        ...state,
        pending: false,
        budgets: action.budgets
      }
    case FETCH_ALL_BUDGETS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      }
    default:
      return state
  }
}

export const getAllBudgetsPending = state => state.budgetsReducer.pending
export const getAllBudgets = state => state.budgetsReducer.budgets
export const getAllBudgetsError = state => state.budgetsReducer.error

