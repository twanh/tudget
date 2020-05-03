import React, { useEffect } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from "redux";

import { getAllTransactions, getAllTransactionsPending, getAllTransactionsError } from "../redux/reducers";
import { fetchAllTransactions } from "../redux/fetchers";

import { Switch, Route, useLocation, useRouteMatch, useParams } from 'react-router-dom'

import { WindMillLoading } from 'react-loadingg'
import TransactionDetail from '../components/Transaction/TransactionDetail';


function ExpenseDetailSwitch({ expenses }) {

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
    <TransactionDetail transaction={expense} />
  )
}

function IncomeDetailSwitch({ income }) {

  let { pk } = useParams()

  const shouldComponentRender = () => {
    if (!pk) return false
    if (!income.length > 0) return false
    return true
  }

  if (!shouldComponentRender()) return <WindMillLoading />

}

function Transactions({ transactions, error, pending, fetchAllTransactions }) {

  let location = useLocation()
  let { path } = useRouteMatch()

  useEffect(() => {
    fetchAllTransactions()
  }, [])

  const shouldPageRender = () => {
    if (pending) return false
    if (error) return false
    return true
  }

  if (!shouldPageRender()) return <WindMillLoading />

  return (
    <React.Fragment>
      <Switch location={location}>
        <Route path={`${path}/add`}>
          Add trans...
        </Route>
        <Route path={`${path}/expense/:pk/edit`}>
          EXpense edit
        </Route>
        <Route path={`${path}/expense/:pk`}>
          <ExpenseDetailSwitch expenses={transactions.filter(trans => {
            return trans.type === 'expense'
          })} />
        </Route>
        <Route path={`${path}/income/:pk/edit`}>
          income edit
        </Route>
        <Route path={`${path}/income/:pk`}>
          Income detail
        </Route>
      </Switch>
    </React.Fragment>
  )
}


const mapStateToProps = state => ({
  transactions: getAllTransactions(state),
  error: getAllTransactionsError(state),
  pending: getAllTransactionsPending(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchAllTransactions: fetchAllTransactions
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Transactions)