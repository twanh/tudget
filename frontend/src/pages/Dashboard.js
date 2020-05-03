import React from 'react'

import { Text, Heading, Flex, Box } from 'rebass'

import { useEffect } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { useHistory, useLocation } from "react-router";

import {
  getAllAccounts, getAllAccountsPending, getAllAccountsError,
  getAllBudgets, getAllBudgetsPending, getAllBudgetsError,
  getAllTransactionsError, getAllTransactions, getAllTransactionsPending,
} from '../redux/reducers'

import { fetchAllAccounts, fetchAllBudgets, fetchAllTransactions } from '../redux/fetchers'


import TransactionsList from '../components/Transaction/TransacionsList'
import BudgetOverview from '../components/Budget/BudgetOverview'
import AccountList from '../components/Account/AccountList'
import { sortTransactionsByDate } from '../utils/helpers/sorting'
import { WindMillLoading } from 'react-loadingg'

function Dashboard({ accounts, fetchAllAccounts, budgets, fetchAllBudgets, transactions, fetchAllTransactions }) {

  useEffect(() => {
    fetchAllAccounts()
    fetchAllBudgets()
    fetchAllTransactions()
  }, [])

  let history = useHistory()

  const shouldPageRender = () => {
    if (accounts.pending) return false
    if (budgets.pending) return false
    if (transactions.pending) return false

    return true
  }

  if (!shouldPageRender()) return <WindMillLoading />

  return (
    <React.Fragment>
      <Heading>Dashboard</Heading>
      <AccountList accounts={accounts.accounts} handleClick={p => history.push(`accounts/${p}`)} />
      <Flex flexWrap='wrap' mt={4} width='100%'>
        <Box sx={{
          order: 2,
          flexGrow: '2',
          flexBasis: '500px',
        }}
          mr={2}>
          <BudgetOverview budgets={budgets.budgets} />
        </Box>
        <Box
          sx={{
            order: 1,
            flexGrow: '1',
            flexBasis: '200px',
          }}
          // bg='blue'
          mr={2}
        >
          links
        </Box>
        <Box
          sx={{
            order: 3,
            flexGrow: '1',
            flexBasis: '250px',
          }}

          mr={2}

        >

          <TransactionsList transactions={sortTransactionsByDate(transactions.transactions).slice(0, 7)} accounts={accounts.accounts} />

        </Box>

      </Flex>

    </React.Fragment >
  )
}

const mapStateToProps = state => ({
  accounts: {
    error: getAllAccountsError(state),
    accounts: getAllAccounts(state),
    pending: getAllAccountsPending(state),
  },
  budgets: {
    error: getAllBudgetsError(state),
    budgets: getAllBudgets(state),
    pending: getAllBudgetsPending(state)
  },
  transactions: {
    error: getAllTransactionsError(state),
    transactions: getAllTransactions(state),
    pending: getAllTransactionsPending(state)
  }
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchAllAccounts: fetchAllAccounts,
  fetchAllBudgets: fetchAllBudgets,
  fetchAllTransactions: fetchAllTransactions
}, dispatch)



export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)