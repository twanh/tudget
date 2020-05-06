import React from 'react'

import { Box, Heading, Flex, Text, Button, } from 'rebass'
import { useHistory, useLocation } from 'react-router-dom'

function TransactionDetail({ transaction, categories, tags }) {

  let history = useHistory()

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
          onClick={e => history.push(`/transactions/${transaction.type}/${transaction.pk}/edit`)}
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
            {categories.find(cat => cat.pk === transaction.category).name}
          </Box>
          &nbsp;|&nbsp;
        </>
      )}
      {transaction.tags && transaction.tags.length > 0 && (
        <>
          Tags:&nbsp;
          {transaction.tags.map(tag => (
            //TODO: Should me made a tag component... :)
            <Box mt={3} mr={1}
              sx={{
                display: 'inline-block',
                color: 'white',
                bg: 'primary',
                px: 2,
                py: 1,
                borderRadius: 9999,
              }}>
              {tags.find(t => t.pk === tag).name}
            </Box>

          ))}
        </>
      )}
    </Box >
  )

}

export default TransactionDetail