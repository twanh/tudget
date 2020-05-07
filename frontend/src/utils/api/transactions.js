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

async function addTransaction(data) {
  // We need to dubble check this, because it is not only required by default
  // it also dictates the url we need to POST request to
  if (!data.type) throw 'No transaction type specified'
  let headers = new Headers()
  headers.append('Content-Type', 'application/json')
  const transaction = JSON.stringify(data)
  const settings = {
    method: 'POST',
    headers,
    body: transaction,
    redirect: 'follow'
  }
  if (data.type === 'expense') {
    return fetch(EXPENSES_URl, settings)
  }
  // if not expense, it should be income...
  return fetch(INCOME_URl, settings)

}

async function deleteTransaction(data) {
  // We need to dubble check this, because it is not only required by default
  // it also dictates the url we need to POST request to
  if (!data.type || !data.pk) throw 'No transaction type or pk specified'
  if (data.type === 'expense') {
    return fetch(`${EXPENSES_URl}/${data.pk}/delete/`)
  }
  // if not expense, it should be income...
  return fetch(`${INCOME_URl}/${data.pk}/delete/`)
}

export {
  fetchAllTransactions,
  updateExpense,
  updateIncome,
  addTransaction,
  deleteTransaction,
}

