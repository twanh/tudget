import React from 'react';
import { useEffect, useState } from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

import { Provider } from "react-redux";
import store from '../redux/store'


// Style components
import { Flex, Box, Heading } from 'rebass'
import SideNav from "./Sidenav";
import Theme from './Theme'

// App components
import Dashboard from '../pages/Dashboard'
import BudgetOverview from './BudgetOverview';

export default function Home() {

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

  return (
    <Provider store={store}>
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
                  <Heading><BudgetOverview></BudgetOverview></Heading>
                </Route>
                <Route path='/'>
                  <Dashboard />
                </Route>
              </Switch>
            </Box>
          </Flex>
        </Theme>
      </Router>
    </Provider>
  )
}
