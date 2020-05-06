import { fetchAllTagsSuccess, fetchAllTagsPending, fetchAllTagsError } from "../actions/tags";

import { fetchAllTags as allTagFetcher } from "../../utils/api/tags";


export function fetchAllTags() {
  return dispatch => {
    dispatch(fetchAllTagsPending())
    allTagFetcher()
      .then(resp => resp.json())
      .then(jsn => {
        dispatch(fetchAllTagsSuccess(jsn))
      })
      .catch(err => fetchAllTagsError(err))
  }
}

