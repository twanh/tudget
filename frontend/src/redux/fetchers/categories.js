import { fetchAllCategoriesError, fetchAllCategoriesPending, fetchAllCategoriesSuccess } from "../actions/categories"

import { fetchAllCategories as allCategoriesFetcher } from "../../utils/api/categories";

export function fetchAllCategories() {
  return dispatch => {
    dispatch(fetchAllCategoriesPending)
    allCategoriesFetcher()
      .then(resp => resp.json())
      .then(jsn => {
        dispatch(fetchAllCategoriesSuccess(jsn))
      })
      .catch(err => dispatch(fetchAllCategoriesError(err)))
  }
}