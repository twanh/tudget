import {
  FETCH_ALL_CATEGORIES_SUCCESS,
  FETCH_ALL_CATEGORIES_ERROR,
  FETCH_ALL_CATEGORIES_PENDING
} from "../actionTypes";

export function FetchAllCategoriesPending() {
  return {
    type: FETCH_ALL_CATEGORIES_PENDING
  }
}

export function FetchAllCategoriesSuccess(categories) {
  return {
    type: FETCH_ALL_CATEGORIES_SUCCESS,
    categories: categories
  }
}

export function FetchAllCategoriesError(error) {
  return {
    type: FETCH_ALL_CATEGORIES_ERROR,
    error: error
  }
}