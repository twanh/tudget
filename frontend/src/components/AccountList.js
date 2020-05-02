import React from 'react'

import { Text, Flex, } from 'rebass'
import { AccountBox } from './Elements'

function AccountList({ accounts, highlightIndx, handleClick }) {

  return (
    <React.Fragment>
      <Flex flexWrap='wrap'>
        {accounts.map((accnt) => (
          <AccountBox key={accnt.pk} bg={highlightIndx === accnt.pk ? 'red' : 'backgroundHighlight'} onClick={e => handleClick(accnt.pk)}>
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