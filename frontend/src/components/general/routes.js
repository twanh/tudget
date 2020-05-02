import React from 'react'

import { Switch, Route, useLocation } from 'react-router-dom'

// App components
import Dashboard from '../../pages/Dashboard'
import Accounts from '../../pages/Accounts'

import BudgetOverview from '../BudgetOverview';




export default function Routes() {

  let location = useLocation()

  return (
    <Switch location={location}>
      <Route path='/accounts'>
        <Accounts />
      </Route>
      <Route path='/savings'>
        <h1>Savings!</h1>
      </Route>
      <Route path='/budgets'>
        <BudgetOverview></BudgetOverview>
      </Route>
      <Route path='/'>
        <Dashboard />
      </Route>
    </Switch>
  )
}
