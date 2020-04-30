import React from 'react'
import { useState, useEffect } from "react";

import { Text, Heading, Flex, Box } from 'rebass'
import { fetchAllAccounts } from '../../utils/api/accounts';

import { AccountBox } from './Elements'

function Dashboard() {

  const [allAccounts, setAllAccounts] = useState([])

  async function getAllAccounts() {
    const accnts = await fetchAllAccounts()
    setAllAccounts(accnts)
  }

  useEffect(() => {
    getAllAccounts()
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
    </React.Fragment >
  )
}

export default Dashboard