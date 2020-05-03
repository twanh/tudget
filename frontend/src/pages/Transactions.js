import React from 'react'

import { Switch, Route, useLocation, useRouteMatch } from 'react-router-dom'

function Transactions() {

  let location = useLocation()
  let { path } = useRouteMatch()


  return (
    <React.Fragment>
      <Switch location={location}>
        <Route exact path={`${path}/add`}>
          <p>Add transaction</p>
        </Route>
        <Route path={`${path}/:transactionPk/edit`}>
          <p>Edit</p>
        </Route>
        <Route path={`${path}/:transactionPk`}>
          <p>Transactions detail</p>
        </Route>

      </Switch>
    </React.Fragment>
  )
}



export default Transactions