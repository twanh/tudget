import React from 'react'
import { useEffect, useState } from 'react'

import { Text, Heading, Flex, Box } from 'rebass'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getAllAccounts, getAllAccountsPending, getAllAccountsError } from '../redux/reducers'
import { fetchAllAccounts } from '../redux/fetchers'

import { useParams, Route, Switch, useRouteMatch, useHistory } from "react-router";
import AccountList from '../components/AccountList'
import AccountDetails from '../components/AccountDetails'

function AccountDetailSwitch({ accounts, returnAccountId }) {

  let { accountId } = useParams()

  const shouldComponentRender = () => {
    if (!accountId) return false
    if (!accounts.length > 0) return false
    return true
  }

  if (!shouldComponentRender()) return <p>Loading...</p>

  const account = accounts.filter(accnt => {
    return accnt.pk == parseInt(accountId)
  })[0]

  returnAccountId(parseInt(accountId))

  return <AccountDetails account={account} />

}

function Accounts({ accounts, error, pending, fetchAllAccounts }) {

  const [currentAccount, setCurrentAccount] = useState(0)

  let { path } = useRouteMatch()
  let { accountId } = useParams()
  let history = useHistory()

  console.log('od', accountId)
  useEffect(() => {
    fetchAllAccounts()
  }, [])

  const shouldPageRender = () => {
    if (pending) return false
    return true
  }

  if (!shouldPageRender()) return <p>Loading...</p>

  const handleAccountListClick = (pk) => {
    setCurrentAccount(pk)
    history.push(`${path}/${pk}`)
  }

  return (
    <React.Fragment>
      <AccountList accounts={accounts} highlightIndx={currentAccount != 0 && currentAccount} handleClick={p => handleAccountListClick(p)}></AccountList>
      <Switch>
        <Route exact path={path}>
          Main page :0
        </Route>
        <Route path={`${path}/:accountId`}>
          <AccountDetailSwitch accounts={accounts} returnAccountId={id => setCurrentAccount(id)} />
        </Route>
      </Switch>
    </React.Fragment>
  )
}

const mapStateToProps = state => ({
  accounts: getAllAccounts(state),
  error: getAllAccountsError(state),
  pending: getAllAccountsPending(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchAllAccounts: fetchAllAccounts,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Accounts)