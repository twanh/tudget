import { BASE_API_URL } from '.'

const ACCOUNTS_URL = BASE_API_URL + 'accounts/'

async function fetchAllAccounts() {
  // const data = await .then(response => response.json())
  return fetch(ACCOUNTS_URL)
}

export {
  fetchAllAccounts,
}