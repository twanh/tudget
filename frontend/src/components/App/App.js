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
  const [items, setItems] = useState([
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
  ])

  // async function fetchAccountData() {
  //   const data = await getAllAccounts()
  //   setallAccounts(data)
  // }


  function handleSideNavClick(name) {
    let newItems = items
    const current = newItems.filter((disp) => {
      return disp.selected
    })[0]
    current.selected = false
    const newDisplay = newItems.filter((display) => {
      return display.name === name
    })[0]
    newDisplay.selected = true
    setItems(newItems)
    setDisplay(newDisplay.component)
  }

  // useEffect(() => {
  //   fetchAccountData()
  // })

  if (!allAccounts) return <p>Loading...</p>

  const navItems = [

  ]

  return (
    <Theme dark={true}>
      <Flex alignItems={'stretch'}>
        <SideNav navItems={items} linkClicked={e => handleSideNavClick(e)}></SideNav>
        <Box pt={20} color='text' width={['100%', "80%", '80%']}>
          {display}
        </Box>
      </Flex>
    </Theme>
  )
}
