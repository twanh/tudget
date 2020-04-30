import { BASE_API_URL } from '.'

const ACCOUNTS_URL = BASE_API_URL + 'accounts/'

async function fetchAllAccounts() {
  const data = await fetch(ACCOUNTS_URL).then(response => response.json())
  return data
}

export {
  fetchAllAccounts,
}