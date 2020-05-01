import React from 'react';

import { Heading, Box, Flex, Text, Button } from 'rebass'

function TransactionsList({ transactions, accounts, ...rest }) {

  return (
    <Box
      // bg='primary'
      // px={[0, 0, 2]}
      height='500px'
    >
      <Heading fontSize={3}>Recent transactions:</Heading>
      <Flex flexDirection='column'>
        {transactions.reverse().slice(0, 10).map(transaction => (
          <Box
            py={1}
            my={2}
            sx={{
              borderBottom: `1px solid`,
              borderColor: 'backgroundHighlight'
              // borderColor: (transaction.type === 'expense' ? 'negative' : 'positive'),
              // borderRadius: '100px'
              // borderTopRightRadius: '50px',
              // borderBottomRightRadius: '50px'
            }}
          // bg={transaction.type === 'expense' ? 'negative' : 'positive'}
          >

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '80% 20%',
              }}
            >
              <Box fontSize={2} fontFamily='heading' color='secondary'>{transaction.name}</Box>
              <Box fontSize={0} fontFamily='monospace' justifySelf='end' color={transaction.type === 'expense' ? 'negative' : 'positive'}>{transaction.type === 'expense' && '-'}&euro;{transaction.amount}</Box>
              <Box fontSize={1}>{accounts.filter(accnt => (accnt.pk === transaction.account))[0].name}</Box>
              <Box fontSize={0} justifySelf='end' color='gray'>{transaction.spendOn}</Box>
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
