import React from 'react'
import { Heading, Box, Text, Flex } from 'rebass'
import TransactionsList from './TransacionsList'

const StyledBox = ({ children }) => (
  <Box sx={{
    flexGrow: '1',
    flexBasis: '200px',
    paddingRight: 5,
  }}>
    {children}
  </Box>
)

function AccountDetails({ account }) {

  return (
    <Box mt={3}>
      <Flex flexWrap='wrap' mt={4} width='100%'>
        <StyledBox>
          <Box sx={{
            padding: 2,
            border: '1px solid',
            borderColor: 'backgroundHighlight',
            boxShadow: '2px 4px 0px 0px #49346f',
            transition: 'box-shadow 0.2s linear',
            marginBottom: 3,
            ':hover': {
              boxShadow: '9px 8px 0px 0px #49346f',
            }
          }}>
            <Heading color='secondary' mb={1}>{account.name}</Heading>
            <Text as='h4' fontSize={1} fontWeight='light'>
              <Text color={account.balance[0] === '-' ? 'negative' : 'positive'} display='inline-block'>&euro;{account.balance}</Text>
              <Text fontFamily='body' display='inline-block'>&nbsp;-&nbsp;</Text>
              <Text fontFamily='body' display='inline-block'>{account.description}</Text>
            </Text>
          </Box>
          <Heading fontSize={3}>
            Cashflow: ...
          </Heading>
          <Heading fontSize={3}>
            Stability: ...
          </Heading>
        </StyledBox>
        <StyledBox>
          <TransactionsList transactions={account.expense_set} titleType='expenses' accounts={[account, {}]} />
        </StyledBox>
        <StyledBox>
          <TransactionsList transactions={account.income_set} titleType='income' accounts={[account, {}]} />
        </StyledBox>
      </Flex>
    </Box >
  )

}

export default AccountDetails