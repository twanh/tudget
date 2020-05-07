import React, { useEffect } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from "redux";

import {
  getAllTransactions, getAllTransactionsPending, getAllTransactionsError,
  getAllAccounts, getAllAccountsError, getAllAccountsPending,
  getAllCategories, getAllCategoriesError, getAllCategoriesPending,
  getAllTags, getAllTagsError, getAllTagsPending
} from "../redux/reducers";

import { fetchAllTransactions, fetchAllAccounts, fetchAllCategories, fetchAllTags, updateExpense, updateIncome, addTransaction } from "../redux/fetchers";

import { Switch, Route, useLocation, useRouteMatch, useParams, useHistory } from 'react-router-dom'

import { WindMillLoading } from 'react-loadingg'
import TransactionDetail from '../components/Transaction/TransactionDetail';
import TransactionEdit from '../components/Transaction/TransactionsEdit';
import TransactionsAdd from '../components/Transaction/TransactionsAdd';


function ExpenseDetailSwitch({ expenses, ...props }) {

  let { pk } = useParams()

  const shouldComponentRender = () => {
    if (!pk) return false
    if (!expenses.length > 0) return false
    return true
  }

  if (!shouldComponentRender()) return <WindMillLoading />

  const expense = expenses.filter(exp => {
    return exp.pk === parseInt(pk)
  })[0]

  if (!expense) return <WindMillLoading /> //TODO: Shoudl 404

  return (
    <TransactionDetail transaction={expense} {...props} />
  )
}

function IncomeDetailSwitch({ income: allincome, ...props }) {

  let { pk } = useParams()

  const shouldComponentRender = () => {
    if (!pk) return false
    if (!allincome.length > 0) return false
    return true
  }

  if (!shouldComponentRender()) return <WindMillLoading />

  const income = allincome.filter(exp => {
    return exp.pk === parseInt(pk)
  })[0]

  if (!income) return <WindMillLoading /> //TODO: Shoudl 404

  return (
    <TransactionDetail transaction={income} {...props} />
  )
}


function Transactions({
  transactions, error, pending,
  fetchAllTransactions, accounts, fetchAllAccounts,
  categories, fetchAllCategories, tags, fetchAllTags,
  updateExpense, updateIncome, addTransaction
}) {

  let location = useLocation()
  let { path } = useRouteMatch()
  let history = useHistory()


  useEffect(() => {
    fetchAllTransactions()
    fetchAllAccounts()
    fetchAllCategories()
    fetchAllTags()
  }, [])

  const shouldPageRender = () => {
    if (pending) return false
    if (error) return false
    if (accounts.pending) return false
    if (accounts.error) return false
    if (categories.pending) return false
    if (categories.error) return false
    if (tags.pending) return false
    if (tags.error) return false

    return true
  }

  if (!shouldPageRender()) return <WindMillLoading />

  const handleExpenseEdit = (pk, expense) => {
    // TODO put req. to server via redux
    updateExpense(pk, expense)
    history.push(`/transactions/expense/${pk}`)
  }

  const handleIncomeEdit = (pk, income) => {
    updateIncome(pk, income)
    history.push(`/transactions/income/${pk}`)
  }

  return (
    <React.Fragment>
      <Switch location={location}>
        <Route path={`${path}/add`}>
          <TransactionsAdd categories={categories.categories} tags={tags.tags} accounts={accounts.accounts} addTransaction={addTransaction} />
        </Route>
        <Route path={`${path}/expense/:pk/edit`}>
          <TransactionEdit
            transactions={transactions.filter(trans => {
              return trans.type === 'expense'
            })}
            accounts={accounts.accounts}
            categories={categories.categories}
            tags={tags.tags}
            onEdit={(pk, expense) => handleExpenseEdit(pk, expense)}
          />
        </Route>
        <Route path={`${path}/expense/:pk`}>
          <ExpenseDetailSwitch expenses={transactions.filter(trans => {
            return trans.type === 'expense'
          })} tags={tags.tags} categories={categories.categories} />
        </Route>
        <Route path={`${path}/income/:pk/edit`}>
          <TransactionEdit
            transactions={transactions.filter(trans => {
              return trans.type === 'income'
            })}
            accounts={accounts.accounts}
            categories={categories.categories}
            tags={tags.tags}
            onEdit={(pk, income) => handleIncomeEdit(pk, income)}
          />
        </Route>
        <Route path={`${path}/income/:pk`}>
          <IncomeDetailSwitch income={transactions.filter(trans => {
            return trans.type === 'income'
          })} tags={tags.tags} categories={categories.categories} />
        </Route>
      </Switch>
    </React.Fragment >
  )
}


const mapStateToProps = state => ({
  transactions: getAllTransactions(state),
  error: getAllTransactionsError(state),
  pending: getAllTransactionsPending(state),
  accounts: {
    accounts: getAllAccounts(state),
    error: getAllAccountsError(state),
    pending: getAllAccountsPending(state)
  },
  categories: {
    categories: getAllCategories(state),
    error: getAllCategoriesError(state),
    pending: getAllCategoriesPending(state),
  },
  tags: {
    tags: getAllTags(state),
    error: getAllTagsError(state),
    pending: getAllTagsPending(state)
  },
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchAllTransactions: fetchAllTransactions,
  fetchAllAccounts: fetchAllAccounts,
  fetchAllCategories: fetchAllCategories,
  fetchAllTags: fetchAllTags,
  updateExpense: updateExpense,
  updateIncome: updateIncome,
  addTransaction: addTransaction
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Transactions)