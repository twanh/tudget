import { BASE_API_URL } from '.'

const ACCOUNTS_URL = BASE_API_URL + 'accounts/'

async function fetchAllAccounts() {
  // const data = await .then(response => response.json())
  return fetch(ACCOUNTS_URL)
}

async function updateAccount(pk, data) {
  const url = `${ACCOUNTS_URL}${pk}/`
  const reqHeaders = new Headers()
  reqHeaders.append("Content-Type", "application/json");
  const settings = {
    method: 'PATCH',
    headers: reqHeaders,
    body: JSON.stringify(data),
    redirect: 'follow'
  }
  return fetch(url, settings)
}

export {
  fetchAllAccounts,
  updateAccount,
}