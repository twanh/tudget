import React from 'react';

import { Heading, Box, Flex, Text, Button } from 'rebass'
import { useHistory } from 'react-router-dom';

function TransactionsList({ transactions, accounts, titleType }) {

  let history = useHistory()

  return (
    <Box
      height='500px'
    >
      <Heading fontSize={3}>Recent {titleType ? titleType : 'transactions'}:</Heading>
      <Flex flexDirection='column'>
        {transactions.map(transaction => (
          <Box
            onClick={e => history.push(`/transactions/${transaction.type}/${transaction.pk}`)}
            py={1}
            my={2}
            sx={{
              borderBottom: `1px solid`,
              borderColor: 'backgroundHighlight',
              cursor: 'pointer',
              ':hover': {
                boxShadow: 'inset 0px -5px 0px 0px #5e35b17a',
                padding: 2
              }
            }}
          >

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '80% 20%',
              }}
            >
              <Box fontSize={2} fontFamily='heading' color='secondary'>{transaction.name}</Box>
              <Box fontSize={0} fontFamily='monospace' justifySelf='end' color={transaction.type === 'expense' ? 'negative' : 'positive'}>{transaction.type === 'expense' && '-'}&euro;{transaction.amount}</Box>
              <Box fontSize={1}>{accounts.filter(accnt => (accnt.pk === transaction.account))[0] && accounts.filter(accnt => (accnt.pk === transaction.account))[0].name}</Box>
              <Box fontSize={0} justifySelf='end' color='gray'>{new Date(transaction.spendOn).toLocaleDateString('nl-NL')}</Box>
            </Box>
          </Box>

        ))}
        <Button mt={3} bg='backgroundHighlight' color='text'>Add transaction</Button>
      </Flex>
    </Box >
  )

}

export default TransactionsList

// Postive #A5D6A7
// Negative: #ef9a9a
