import { BASE_API_URL } from '.'

const TRANSACTIONS_URl = BASE_API_URL + 'transactions/'
const EXPENSES_URl = TRANSACTIONS_URl + 'expenses/'
const INCOME_URl = TRANSACTIONS_URl + 'income/'

async function fetchAllTransactions() {
  const exp = await fetch(EXPENSES_URl).then(resp => resp.json())
  const inc = await fetch(INCOME_URl).then(resp => resp.json())

  // TODO: Fix sorting...
  return [...exp, ...inc]
}



async function updateExpense(pk, data) {
  console.log({ data })
  const url = `${EXPENSES_URl}${pk}/`
  const reqHeaders = new Headers()
  reqHeaders.append('Content-Type', 'application/json')
  const settings = {
    method: 'PATCH',
    mode: 'cors',
    headers: reqHeaders,
    body: JSON.stringify(data),
    redirect: 'follow'
  }
  return fetch(url, settings)
}

async function updateIncome(pk, data) {
  console.log({ data })
  const url = `${INCOME_URl}${pk}/`
  const reqHeaders = new Headers()
  reqHeaders.append('Content-Type', 'application/json')
  const settings = {
    method: 'PATCH',
    mode: 'cors',
    headers: reqHeaders,
    body: JSON.stringify(data),
    redirect: 'follow'
  }
  return fetch(url, settings)
}


export {
  fetchAllTransactions,
  updateExpense,
  updateIncome
}
