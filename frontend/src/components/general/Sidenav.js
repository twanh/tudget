import React from 'react'

import Sidepane from 'sidepane'
import { Box, Link, Heading } from "rebass";

import { NavLink as RouteLink } from 'react-router-dom'

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
          <RouteLink
            exact
            to={navItem.link}
            style={{
              textDecoration: 'none',
              display: 'block',
              color: '#e9e9eb',
            }}
            activeStyle={{
              color: '#E4B363'
            }}
          >
            <Link
              pt={2}
              variant='nav'
              sx={{
                fontFamily: 'heading',
                ':hover': {
                  textDecoration: 'underline',
                  'color': 'text',
                  cursor: 'pointer',
                }
              }}
            >
              {navItem.name}
            </Link>
          </RouteLink>
        ))}
      </Box>

    </Sidepane >
  )
}


export default SideNav