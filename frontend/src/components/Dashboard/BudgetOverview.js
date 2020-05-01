import React from 'react'

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


import { Box, Heading, Flex, Text } from 'rebass'


function BudgetOverview({ budgets, ...rest }) {

  return (

    <Box height='500px'>
      <Heading fontSize={3}>Budget overview:</Heading>
      <Flex flexDirection='column'>
        {budgets && budgets.slice(0, 4).map(budget => (
          <Box my={2} sx={{
            display: 'grid',
            // gridTemplateColumns: '10% 90%'
            gridTemplateColumns: '1.5fr 10fr',
          }}>
            {budget.maxAmount ? (
              <Box maxWidth='' ml={1} pl={3} sx={{
                borderLeft: '2px solid',
                borderColor: 'backgroundHighlight'
              }}>
                <CircularProgressbar
                  value={budget.current}
                  maxValue={budget.maxAmount}
                  text={`${Math.round(((budget.current / budget.maxAmount) * 100))}%`}
                  styles={buildStyles({
                    pathTransitionDuration: 1,
                    pathColor: '#512DA8', //(Math.round(((budget.current / budget.maxAmount) * 100)) < 80 ? '#512DA8' : '#e74c3c'),
                    trailColor: '#273447',
                    pathTransition: 'stroke-dashoffset 0.5s ease 0s'
                  })}
                />
              </Box>
            ) : (
                <Box maxWidth='' ml={1} pl={3} sx={{
                  borderLeft: '2px solid',
                  borderColor: 'backgroundHighlight',
                }}>
                  <CircularProgressbar
                    value={budget.current}
                    maxValue={budget.maxTransactions}
                    text={`${Math.round(((budget.current / budget.maxTransactions) * 100))}%`}
                    styles={buildStyles({
                      pathTransitionDuration: 1,
                      pathColor: '#512DA8', //(Math.round(((budget.current / budget.maxAmount) * 100)) < 80 ? '#512DA8' : '#e74c3c'),
                      trailColor: '#273447',
                      pathTransition: 'stroke-dashoffset 0.5s ease 0s'
                    })}
                  />
                </Box>
              )}
            <Box ml={3} >
              <Heading fontSize={2} >{budget.name}</Heading>
              <Text color='gray' fontSize={0} fontFamily='monospace'>{(budget.maxAmount && '€')}{budget.current}/{budget.maxAmount ? ("€" + budget.maxAmount) : (budget.maxTransactions + ' transactions')}</Text>
              <Text fontSize={1} color='gray'>Tracking category: {budget.filterCategory}</Text>
              <Text color='text' fontSize={1} >"{budget.reason != '' ? budget.reason : '-'}"</Text>

            </Box>
          </Box>
        ))}
      </Flex>
    </Box>

  )

}

export default BudgetOverview