import {
  FETCH_ALL_CATEGORIES_SUCCESS,
  FETCH_ALL_CATEGORIES_ERROR,
  FETCH_ALL_CATEGORIES_PENDING
} from "../actionTypes";

export function fetchAllCategoriesPending() {
  return {
    type: FETCH_ALL_CATEGORIES_PENDING
  }
}

export function fetchAllCategoriesSuccess(categories) {
  return {
    type: FETCH_ALL_CATEGORIES_SUCCESS,
    categories: categories
  }
}

export function fetchAllCategoriesError(error) {
  return {
    type: FETCH_ALL_CATEGORIES_ERROR,
    error: error
  }
}