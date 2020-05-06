import { BASE_API_URL } from '.'

const TAGS_URL = BASE_API_URL + 'groupings/tags/'

async function fetchAllTags() {
  return fetch(TAGS_URL)
}

export {
  fetchAllTags

}