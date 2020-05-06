import { BASE_API_URL } from '.'

const CATEGORIES_URL = BASE_API_URL + 'groupings/categories/'

async function fetchAllCategories() {
  return fetch(CATEGORIES_URL)
}

export {
  fetchAllCategories
}