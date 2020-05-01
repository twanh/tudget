import React from 'react'

import { Text, Heading, Flex, Box } from 'rebass'

import { useEffect } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getAllAccounts, getAllAccountsPending, getAllAccountsError, } from '../redux/reducers/accounts'

import { fetchAllAccounts } from '../redux/fetchers/accounts'


import TransactionsList from '../components/TransacionsList'
import BudgetOverview from '../components/BudgetOverview'
import AccountList from '../components/AccountList'

function Dashboard({ accounts, fetchAllAccounts }) {

  useEffect(() => {
    fetchAllAccounts()
  }, [])

  return (
    <React.Fragment>
      <Heading>Dashboard</Heading>
      <AccountList accounts={accounts.accounts} pending={accounts.pending} />
      <Flex flexWrap='wrap' mt={4} width='100%'>
        <Box sx={{
          order: 2,
          flexGrow: '2',
          flexBasis: '500px',
        }}
          mr={2}>
          <BudgetOverview />
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

          {/* <TransactionsList transactions={allTransactions} accounts={allAccounts} /> */}

        </Box>

      </Flex>

    </React.Fragment >
  )
}

const mapStateToProps = state => ({
  accounts: {
    accountError: getAllAccountsError(state),
    accounts: getAllAccounts(state),
    accountPending: getAllAccountsPending(state),
  }
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchAllAccounts: fetchAllAccounts
}, dispatch)



export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)