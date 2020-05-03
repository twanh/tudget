import React from 'react';

import {
  BrowserRouter as Router,
} from 'react-router-dom'

import { Provider } from "react-redux";
import store from '../../redux/store'

// Style components
import { Flex, Box } from 'rebass'
import SideNav from "./Sidenav";
import Theme from './Theme'


export default function Layout({ children }) {

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
              {children}
            </Box>
          </Flex>
        </Theme>
      </Router>
    </Provider>
  )
}
