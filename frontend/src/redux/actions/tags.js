import {
  FETCH_ALL_TAGS_SUCCESS,
  FETCH_ALL_TAGS_ERROR,
  FETCH_ALL_TAGS_PENDING
} from "../actionTypes";


export function fetchAllTagsPending() {
  return {
    type: FETCH_ALL_TAGS_PENDING
  }
}

export function fetchAllTagsSuccess(tags) {
  return {
    type: FETCH_ALL_TAGS_SUCCESS,
    tags: tags
  }
}

export function fetchAllTagsError(error) {
  return {
    type: FETCH_ALL_TAGS_ERROR,
    error: error
  }
}
