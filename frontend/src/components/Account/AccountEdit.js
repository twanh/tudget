import React from 'react'

import { useParams, useHistory } from 'react-router-dom'

import Formol, { Field } from "formol/lib/formol"

import { WindMillLoading } from "react-loadingg";

function AccountEdit({ accounts, onEdit, returnAccountId }) {

  let { accountId } = useParams()

  const currentAccnt = accounts.find(accnt => accnt.pk === parseInt(accountId))

  const shouldComponentRender = () => {
    if (!accountId) return false
    if (!accounts) return false
    if (!currentAccnt) return false
    return true
  }

  if (!shouldComponentRender()) return <WindMillLoading />


  let defaultValues = currentAccnt

  const handleSubmit = (item) => {
    onEdit(parseInt(accountId), item)
  }

  // returnAccountId(parseInt(accountId))
  return (
    <Formol item={defaultValues} onSubmit={item => handleSubmit(item)}>
      <Field name='name'>Name:</Field>
      <Field name='description' type='area'>Description</Field>
    </Formol>
  )

}

export default AccountEdit