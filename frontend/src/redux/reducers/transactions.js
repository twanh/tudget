import {
  FETCH_ALL_TRANSACTIONS_PENDING,
  FETCH_ALL_TRANSACTIONS_ERROR,
  FETCH_ALL_TRANSACTIONS_SUCCESS,

  UPDATE_EXPENSE_ERROR,
  UPDATE_EXPENSE_PENDING,
  UPDATE_EXPENSE_SUCCESS,

  UPDATE_INCOME_ERROR,
  UPDATE_INCOME_PENDING,
  UPDATE_INCOME_SUCCESS
} from "../actionTypes";


export const initalState = {
  pending: false,
  transactions: [],
  error: null
}

function updateExpense(state, data) {
  // Get the index of the item we want to update
  // We need to check for the same primary key (pk) and the expense type, becuase the transactions array
  // can contain items with the same pk becuase it contains expenses & income
  const indx = state.transactions.findIndex(item => (item.pk === data.pk && item.type === 'expense'))
  return [
    ...state.transactions.slice(0, indx),
    data,
    ...state.transactions.slice(indx + 1)
  ]

}

function updateIncome(state, data) {
  // Get the index of the item we want to update
  // We need to check for the same primary key (pk) and the expense type, becuase the transactions array
  // can contain items with the same pk becuase it contains expenses & income
  const indx = state.transactions.findIndex(item => (item.pk === data.pk && item.type === 'income'))
  return [
    ...state.transactions.slice(0, indx),
    data,
    ...state.transactions.slice(indx + 1)
  ]

}

export function transactionsReducer(state = initalState, action) {
  switch (action.type) {
    case FETCH_ALL_TRANSACTIONS_PENDING:
      return {
        ...state,
        pending: true
      }
    case FETCH_ALL_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        pending: false,
        transactions: action.transactions
      }
    case FETCH_ALL_TRANSACTIONS_ERROR:
      return {
        ...state,
        error: action.error
      }

    case UPDATE_EXPENSE_PENDING:
      return {
        ...state,
        pending: true,
      }

    case UPDATE_EXPENSE_SUCCESS:
      return {
        ...state,
        pending: false,
        transactions: updateExpense(state, action.expense)
      }

    case UPDATE_EXPENSE_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      }

    case UPDATE_INCOME_PENDING:
      return {
        ...state,
        pending: true,
      }

    case UPDATE_INCOME_SUCCESS:
      return {
        ...state,
        pending: false,
        transactions: updateIncome(state, action.income)
      }

    case UPDATE_INCOME_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      }

    default:
      return state
  }
}


export const getAllTransactionsPending = state => state.transactionsReducer.pending
export const getAllTransactions = state => state.transactionsReducer.transactions
export const getAllTransactionsError = state => state.transactionsReducer.error

