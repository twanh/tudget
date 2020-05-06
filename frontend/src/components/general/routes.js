import React from 'react'

import { Switch, Route, useLocation, Redirect } from 'react-router-dom'

// App components
import Dashboard from '../../pages/Dashboard'
import Accounts from '../../pages/Accounts'

import BudgetOverview from '../Budget/BudgetOverview';
import Transactions from '../../pages/Transactions';




export default function Routes() {

  let location = useLocation()

  return (
    <Switch>
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
      <Route path='/dashboard'>
        <Dashboard />
      </Route>
      <Route path='/'>
        <Redirect to='/dashboard' />
      </Route>
    </Switch>
  )
}
