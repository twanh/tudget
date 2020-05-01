import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

import { useEffect, useState } from 'react'

// Style components
import { Flex, Box, Heading } from 'rebass'
import SideNav from "../Sidenav/Sidenav";
import Theme from '../Theme/Theme'

// App components
import Dashboard from '../Dashboard/Dashboard'


// import { getAllAccounts } from '../utils/api/accounts/accounts'

export default function Home() {

  const [allAccounts, setallAccounts] = useState([])

  const navItems = [
    {
      name: 'Dasboard',
      selected: true,
      link: '/'
    },
    {
      name: 'Accounts',
      selected: false,
      link: '/accounts'
    },
    {
      name: 'Savings',
      selected: false,
      link: '/savings'
    },
    {
      name: 'Budgets',
      selected: false,
      link: '/budgets'
    }
  ]

  if (!allAccounts) return <p>Loading...</p>

  return (
    <Router>
      <Theme dark={true}>
        <Flex alignItems={'stretch'}>
          <SideNav navItems={navItems} ></SideNav>
          <Box pt={20} color='text' width={['100%', "80%", '80%']}>
            <Switch>
              <Route path='/accounts'>
                <Heading>Accounts!</Heading>
              </Route>
              <Route path='/savings'>
                <Heading>Savings!</Heading>
              </Route>
              <Route path='/budgets'>
                <Heading>Budgets</Heading>
              </Route>
              <Route path='/'>
                <Dashboard />
              </Route>
            </Switch>
          </Box>
        </Flex>
      </Theme>
    </Router>
  )
}
