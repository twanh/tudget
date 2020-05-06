import {
  FETCH_ALL_TAGS_SUCCESS,
  FETCH_ALL_TAGS_ERROR,
  FETCH_ALL_TAGS_PENDING
} from "../actionTypes";

export const initalState = {
  pending: false,
  tags: [],
  error: null
}

export function tagsReducer(state = initialState, action) {

  switch (action.type) {
    case FETCH_ALL_TAGS_PENDING:
      return {
        ...state,
        pending: true
      }
    case FETCH_ALL_TAGS_SUCCESS:
      return {
        ...state,
        pending: false,
        tags: action.tags
      }
    case FETCH_ALL_TAGS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      }

    default:
      return state
  }

}


export const getAllTagsPending = state => state.tagsReducer.pending
export const getAllTags = state => state.tagsReducer.categories
export const getAllTagsError = state => state.tagsReducer.error

