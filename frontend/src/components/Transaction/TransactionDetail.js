import React from 'react'

import { Box, Heading, Flex, Text, Button, } from 'rebass'

function TransactionDetail({ transaction, handleEdit }) {

  return (
    <Box >
      <Flex
        color='white'
        alignItems='center'>
        <Heading color='secondary'>{transaction.name}</Heading>
        <Box mx='auto' />
        <Button variant='outline'
          sx={{
            outline: 'none',
            cursor: 'pointer',
            boxShadow: 'none',
            border: '1px solid',
            borderColor: 'primary',
            ':hover': {
              boxShadow: '2px 4px 0px 0px #EF6461'
            }
          }}
          px={3} fontWeight="bold" fontSize={1}
          onClick={e => handleEdit(e)}
        >Edit</Button>
        <Button variant='primary'
          ml={3}
          sx={{
            outline: 'none',
            cursor: 'pointer',
            boxShadow: 'none',
            border: '1px solid',
            borderColor: 'primary',
            ':hover': {
              backgroundColor: 'negative',
              color: 'text',
            }
          }}
          px={3} fontWeight="bold" fontSize={1}
        //TODO: Add delete handler.
        >Delete</Button>
      </Flex>
      <Text as='h4' fontSize={2} fontWeight='light'>
        <Text color={transaction.type === 'expense' ? 'negative' : 'positive'} display='inline-block' fontFamily='monospace'>&euro;{transaction.type === 'expense' ? '-' : ''}{transaction.amount}</Text>
        <Text fontFamily='body' display='inline-block'>&nbsp;-&nbsp;</Text>
        <Text fontFamily='body' display='inline-block'>{transaction.description}</Text>
      </Text>
      {transaction.category && (
        <>
          Category:&nbsp;
          <Box mt={3} px={2} mr={1}
            sx={{
              display: 'inline-block',
              color: 'white',
              bg: 'backgroundHighlight',
              px: 2,
              py: 1,
              borderRadius: 9999,
            }}>
            {/* TODO: Fetch category name */}
            {transaction.category && 'Uit eten'}
          </Box>
          &nbsp;|&nbsp;
        </>
      )}
      {transaction.tags && transaction.tags.length > 0 && (
        <>
          Tags:&nbsp;
          {transaction.tags.map(tag => (
            <Box mt={3} mr={1}
              sx={{
                display: 'inline-block',
                color: 'white',
                bg: 'primary',
                px: 2,
                py: 1,
                borderRadius: 9999,
              }}>
              {/* TODO: Fetch tag names */}
              {/* {tag} */}
          Eten
            </Box>

          ))}
        </>
      )}
    </Box >
  )

}

export default TransactionDetail