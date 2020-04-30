import React from 'react';

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
  const [display, setDisplay] = useState(<Dashboard />)

  // async function fetchAccountData() {
  //   const data = await getAllAccounts()
  //   setallAccounts(data)
  // }


  function handleSideNavClick(name) {
    console.log('handeling')
    const newDisplay = navItems.filter((display) => {
      return display.name === name
    })[0]
    setDisplay(newDisplay.component)
  }

  // useEffect(() => {
  //   fetchAccountData()
  // })

  if (!allAccounts) return <p>Loading...</p>

  const navItems = [
    {
      name: 'Dasboard',
      selected: true,
      component: <Dashboard />
    },
    {
      name: 'Accounts',
      selected: false,
      component: <Heading>Accounts</Heading>
    },
    {
      name: 'Savings',
      selected: false,
      component: <Heading>Savings</Heading>
    },
    {
      name: 'Budgets',
      selected: false,
      component: <Heading>Budgets</Heading>
    }
  ]

  return (
    <Theme dark={true}>
      <Flex alignItems={'stretch'}>
        <SideNav navItems={navItems} linkClicked={e => handleSideNavClick(e)}></SideNav>
        <Box pt={20} color='text'>
          {display}
        </Box>
      </Flex>
    </Theme>
  )
}
