import React from 'react'

import { Switch, Route, useLocation } from 'react-router-dom'

// App components
import Dashboard from '../../pages/Dashboard'
import Accounts from '../../pages/Accounts'

import BudgetOverview from '../Budget/BudgetOverview';
import Transactions from '../../pages/Transactions';




export default function Routes() {

  let location = useLocation()

  return (
    <Switch location={location}>
      <Route exact path='/'>
        <Dashboard />
      </Route>
      <Route path='/accounts'>
        <Accounts />
      </Route>
      <Route path='/savings'>
        <h1>Savings!</h1>
      </Route>
      <Route path='/budgets'>
        <BudgetOverview></BudgetOverview>
      </Route>
      <Route path='/transactions'>
        <Transactions />
      </Route>

    </Switch>
  )
}
