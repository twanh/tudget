import React from 'react'

import Formol, { Field } from 'formol/lib/formol'
import 'formol/lib/default.css'
import './formol-styles.css'

import { WindMillLoading } from 'react-loadingg'
import { useHistory } from 'react-router-dom'


function TransactionsAdd({ addTransaction, accounts, categories, tags }) {

  let history = useHistory()

  const shouldComponentRender = () => {
    if (!accounts) return false
    if (!categories) return false
    if (!tags) return false
    return true
  }

  if (!shouldComponentRender()) return <WindMillLoading />

  const handeSubmit = (item) => {
    let newTransaction = item
    newTransaction.account = accounts.find(accnt => accnt.name === newTransaction.account.name).pk
    if (newTransaction.tags) {
      newTransaction.tags = newTransaction.tags.map(t => tags.find(tag => tag.name === t).pk)
    }
    if (newTransaction.category) {
      newTransaction.category = categories.find(cat => cat.name === newTransaction.category.name).pk
    }

    addTransaction(newTransaction)
    history.goBack()

  }

  return (
    <Formol submitText='Create' onSubmit={item => handeSubmit(item)}>
      <Field name='name' required>Name:</Field>
      <Field name='description' type='area'>Description:</Field>
      <Field name='amount' type='number' required>Amount (&euro;):</Field>
      <Field name='type' type='select' required choices={['income', 'expense']}>Type</Field>
      <Field name='account.name' type='select' choices={accounts.map(accnt => accnt.name)} required>Account</Field>
      <Field name='category.name' type='select' choices={categories.map(cat => cat.name)}>Category:</Field>
      <Field name='tags' type='checkbox-set' choices={tags.map(tag => tag.name)}>Tags:</Field>
      <Field name='spendOn' type='date'>Spend on:</Field>
    </Formol>
  )

}

export default TransactionsAdd