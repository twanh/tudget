import { BASE_API_URL } from '.'

const BUDGETS_URL = BASE_API_URL + 'budgets/'
const CURRENCY_BUDGETS_URL = BASE_API_URL + 'budgets/currency/'
const TRANSACTION_BUDGETS_URL = BASE_API_URL + 'budgets/transaction/'



async function fetchAllBudgets() {
  const currency_data = await fetch(CURRENCY_BUDGETS_URL).then(resp => resp.json())
  const transaction_data = await fetch(TRANSACTION_BUDGETS_URL).then(resp => resp.json())
  return [...currency_data, ...transaction_data]
}

export {
  fetchAllBudgets
}