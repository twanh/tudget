import React from 'react'
import { useState, useEffect } from "react";

import { Text, Heading, Flex, Box } from 'rebass'
import { fetchAllAccounts } from '../../utils/api/accounts';
import { fetchAllTransactions } from '../../utils/api/transactions';
import { fetchAllBudgets } from '../../utils/api/budgets'

import { AccountBox } from './Elements'
import TransactionsList from './TransacionsList'
import BudgetOverview from './BudgetOverview'

function Dashboard() {

  const [allAccounts, setAllAccounts] = useState([])
  const [allTransactions, setAllTransactions] = useState([])
  const [allBudgets, setAllBudgets] = useState([])

  async function getAllAccounts() {
    const accnts = await fetchAllAccounts()
    setAllAccounts(accnts)
  }

  async function getAllTransactions() {
    const transactions = await fetchAllTransactions()
    setAllTransactions(transactions)
  }


  async function getAllBudgets() {
    const budgets = await fetchAllBudgets()
    setAllBudgets(budgets)
  }

  useEffect(() => {
    getAllAccounts()
    getAllTransactions()
    getAllBudgets()
  }, [])

  return (
    <React.Fragment>
      <Heading>Dashboard</Heading>
      {allAccounts.length > 0 ? (

        <Flex flexWrap='wrap'>
          {allAccounts.map(accnt => (
            <AccountBox>
              <Text fontWeight='bold' fontFamily='heading' fontSize={2}>{accnt.name}</Text>
              <Text fontFamily='monospace' fontWeight='light' fontSize={0}>&euro;{accnt.balance}</Text>
            </AccountBox>
          ))}
        </Flex>

      ) : (
          <Text sx={{ fontFamily: 'body' }}>Loading...</Text >
        )
      }

      <Flex flexWrap='wrap' mt={4} width='100%'>
        <Box
          sx={{
            order: 2,
            flexGrow: '2',
            flexBasis: '500px',
          }}
          // bg='red'
          mr={2}
        >

          <BudgetOverview budgets={allBudgets} />

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
          // bg='yellow'
          mr={2}

        >

          <TransactionsList transactions={allTransactions} accounts={allAccounts} />

        </Box>

      </Flex>

    </React.Fragment >
  )
}

export default Dashboard