import React from 'react'

import Sidepane from 'sidepane'
import { Flex, Box, Link, Heading } from "rebass";
function SideNav(props) {
  return (
    <Sidepane>
      <Box width={[256]} py={10} px={3} bg='background' color='text' css={{
        minHeight: '100vh'
      }}>
        <Heading color='primary' pt={20} pb={50} px={2}>
          Tudget
        </Heading>

        {props.navItems.map(navItem => (
          <Link
            pt={2}
            color={navItem.selected ? 'secondary' : 'text'}
            variant='nav'
            sx={{
              fontFamily: 'heading',
              ':hover': {
                textDecoration: 'underline',
                'color': 'text',
                cursor: 'pointer',
              }
            }}
            onClick={e => props.linkClicked(navItem.name)} css={{
              display: 'block'
            }}>
            {navItem.name}
          </Link>
        ))}
      </Box>

    </Sidepane >
  )
}


export default SideNav