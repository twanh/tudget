import React from 'react'

import { Text, Flex, } from 'rebass'
import { AccountBox } from './Elements'

function AccountList({ error, accounts, pending, fetchAllAccounts }) {

  const shouldComponentRender = () => {
    if (pending) return false
    if (!accounts) return false
    return true
  }

  if (!shouldComponentRender()) return <p>Loading...</p>

  return (
    <React.Fragment>
      <Flex flexWrap='wrap'>
        {accounts.map(accnt => (
          <AccountBox>
            <Text fontWeight='bold' fontFamily='heading' fontSize={2}>{accnt.name}</Text>
            <Text fontFamily='monospace' fontWeight='light' fontSize={0}>&euro;{accnt.balance}</Text>
          </AccountBox>
        ))}
      </Flex>
    </React.Fragment>
  )
}

// NOTE TO SELF: REDUX SEEMS  TO WORK, ONLY PASSES UNDIFINED ??

export default AccountList