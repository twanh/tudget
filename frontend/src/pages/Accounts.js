import React from 'react'
import { useEffect, useState } from 'react'

import { Text, Heading, Flex, Box } from 'rebass'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getAllAccounts, getAllAccountsPending, getAllAccountsError } from '../redux/reducers'
import { fetchAllAccounts, updateAccount } from '../redux/fetchers'

import { WindMillLoading } from 'react-loadingg';

import { useParams, Route, Switch, useRouteMatch, useHistory } from "react-router";
import AccountList from '../components/Account/AccountList'
import AccountDetails from '../components/Account/AccountDetails'
import AccountEdit from '../components/Account/AccountEdit'

function AccountDetailSwitch({ accounts, returnAccountId }) {

  let { accountId } = useParams()

  const shouldComponentRender = () => {
    if (!accountId) return false
    if (!accounts.length > 0) return false
    return true
  }

  if (!shouldComponentRender()) return <WindMillLoading />

  const account = accounts.filter(accnt => {
    return accnt.pk == parseInt(accountId)
  })[0]

  returnAccountId(parseInt(accountId))

  return <AccountDetails account={account} />

}

function Accounts({ accounts, error, pending, fetchAllAccounts, updateaAccount }) {

  const [currentAccount, setCurrentAccount] = useState(0)

  let { path } = useRouteMatch()
  let history = useHistory()

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

  const handleEdit = (pk, item) => {
    console.log({ pk, item })
    debugger
    updateaAccount(pk, item)
    history.push(`/accounts/${pk}`)
  }

  const updateHighlighedId = (id) => {
    // move this logic to the account list comp...
    setCurrentAccount(id)
  }

  return (
    <React.Fragment>
      <Switch>
        <Route exact path={path}>
          <AccountList accounts={accounts} highlightIndx={currentAccount != 0 && currentAccount} handleClick={p => handleAccountListClick(p)}></AccountList>
          Main page :0
        </Route>
        <Route path={`${path}/:accountId/edit`}>
          <AccountEdit accounts={accounts} returnAccountId={id => updateHighlighedId(id)} onEdit={(pk, item) => handleEdit(pk, item)} />
        </Route>
        <Route path={`${path}/:accountId`}>
          <AccountList accounts={accounts} highlightIndx={currentAccount != 0 && currentAccount} handleClick={p => handleAccountListClick(p)}></AccountList>
          <AccountDetailSwitch accounts={accounts} returnAccountId={id => updateHighlighedId(id)} />
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
  updateaAccount: updateAccount,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Accounts)