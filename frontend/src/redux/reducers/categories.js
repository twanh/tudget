import {
  FETCH_ALL_CATEGORIES_SUCCESS,
  FETCH_ALL_CATEGORIES_ERROR,
  FETCH_ALL_CATEGORIES_PENDING
} from "../actionTypes";

export const initialState = {
  pending: false,
  categories: [],
  error: null
}

export function categoriesReducer(state = initialState, action) {
  switch (actio.type) {
    case FETCH_ALL_CATEGORIES_PENDING:
      return {
        ...state,
        pending: true
      }
    case FETCH_ALL_CATEGORIES_SUCCESS:
      return {
        ...state,
        pending: false,
        categories: action.categories
      }
    case FETCH_ALL_CATEGORIES_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      }

    default:
      return state
  }
}


export const getAllCategories = state => state.categoriesReducer.categories
export const getAllCategoriesPending = state => state.categoriesReducer.pending
export const getAllCategoriesError = state => state.categoriesReducer.error

