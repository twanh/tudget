import React from 'react'

import Formol, { Field } from 'formol/lib/formol'
import 'formol/lib/default.css'

import { useParams } from "react-router-dom";
import { WindMillLoading } from 'react-loadingg';

import './formol-styles.css'

function TransactionEdit({ transactions, accounts, categories, tags, onEdit }) {

  let { pk } = useParams()

  //TODO Could be find() but filter works for now 
  const currentTransaction = transactions.filter(trans => trans.pk === parseInt(pk))[0]

  const shouldComponentRender = () => {
    if (!pk) return false
    if (!currentTransaction) return false
    if (!accounts) return false
    if (!categories) return false
    if (!tags) return false
    return true
  }

  if (!shouldComponentRender()) return <WindMillLoading />

  let defaultValues = currentTransaction

  // fill in all the data for the current transactions account/category & tags
  // we select the data using the primary key (pk)
  defaultValues.account = accounts.filter(accnt => (accnt.pk === currentTransaction.account))[0]
  defaultValues.category = categories.filter(cat => (cat.pk === currentTransaction.category))[0]
  defaultValues.tags = defaultValues.tags.map(tag => {
    return tags.find(t => t.pk === tag)
  })
  defaultValues.tags = defaultValues.tags.map(tag => tag.name)

  function handleEdit(item) {
    // Convert the selected name of the account to the corresponding pk...
    let submittedItem = item
    submittedItem.pk = pk
    // Get the primary key of the selected account and set the sumbmittedItem.account to it
    // because the api uses pk's to refrence accounts
    let accountPk = accounts.filter(accnt => (accnt.name === submittedItem.account.name))[0].pk
    submittedItem.account = accountPk
    // Get the primary key of the selected category and set the sumbmittedItem.category to it
    // because the api uses pk's to refrence categories
    let catPk = categories.filter(cat => (cat.name === submittedItem.category.name))[0].pk
    submittedItem.category = catPk

    let tagsPks = submittedItem.tags.map(tag => {
      return tags.find(t => t.name === tag).pk
    })

    submittedItem.tags = tagsPks
    console.log({ item, submittedItem })
    // TODO: Path request to update
    onEdit(pk, submittedItem)

  }

  return (
    // TODO: should this be its own component?
    <Formol item={defaultValues} submitText='Update' onSubmit={item => handleEdit(item)} >
      <Field name='name' required>Name:</Field>
      <Field name='description' type='area'>Description:</Field>
      <Field name='amount' type='number'>Amount (&euro;):</Field>
      <Field name='account.name' type='select-menu' choices={accounts.map(accnt => accnt.name)}>Account</Field>
      <Field name='category.name' type='select-menu' choices={categories.map(cat => cat.name)}>Category:</Field>
      <Field name='tags' type='checkbox-set' choices={tags.map(tag => tag.name)}>Tags:</Field>
      <Field name='spendOn' type='date'>Spend on:</Field>
    </Formol >

  )
}

export default TransactionEdit