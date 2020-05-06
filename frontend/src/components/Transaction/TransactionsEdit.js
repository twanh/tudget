import React from 'react'

import Formol, { Field } from 'formol/lib/formol'
import 'formol/lib/default.css'

import { useParams } from "react-router-dom";
import { WindMillLoading } from 'react-loadingg';

function TransactionEdit({ transactions, accounts }) {

  let { pk } = useParams()

  const currentTransaction = transactions.filter(trans => trans.pk === parseInt(pk))[0]

  const shouldComponentRender = () => {
    if (!pk) return false
    if (!currentTransaction) return false
    if (!accounts) return false
    return true
  }

  if (!shouldComponentRender()) return <WindMillLoading />

  let defaultValues = currentTransaction
  defaultValues.account = accounts[currentTransaction.account]

  function handleEdit(item) {

    // Convert the selected name of the account to the corresponding pk...
    let sumbmittedItem = item
    let accountPk = accounts.filter(accnt => (accnt.name === sumbmittedItem.account.name))[0].pk
    sumbmittedItem.account = accountPk

    // TODO: Path request to update


  }

  return (

    <Formol item={defaultValues} submitText='Update' onSubmit={item => handleEdit(item)} >
      <Field name='name' required>Name:</Field>
      <Field name='description' type='area'>Description:</Field>
      <Field name='amount' type='number'>Amount (&euro;):</Field>
      <Field name='account.name' type='select-menu' choices={accounts.map(accnt => accnt.name)}>Account</Field>
      <Field name='category' type='select-menu' choices={[1, 2, 3, 4, 5]}>Category:</Field>
      <Field name='tags' type='checkbox-set' choices={[1, 2, 3, 4, 5, 6, 7]}>Tags:</Field>
      <Field name='spendOn' type='date'>Spend on:</Field>
    </Formol >

  )
}

export default TransactionEdit