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

export {
  fetchAllTransactions
}