import React from 'react'

import { Button, Heading } from 'rebass'

import { useParams, useHistory } from "react-router-dom";
import WindMillLoading from 'react-loadingg/lib/WindMillLoading';

function TransactionDelete({ transactions, type, deleteTransaction }) {

  let history = useHistory()
  let { pk } = useParams()

  const currentTransaction = transactions.find(trans => trans.pk === parseInt(pk) && trans.type === type)
  const shouldComponentRender = () => {
    if (!transactions) return false
    if (!pk) return false
    if (!currentTransaction) return false
    return true
  }

  if (!shouldComponentRender()) return <WindMillLoading />

  const handleDelete = () => {
    deleteTransaction(currentTransaction)
    history.push('/dashboard')
  }

  return (
    <>
      <Heading color='negative' my={3}>Are you sure you want to delete <span style={{ textDecoration: 'underline' }}>{currentTransaction.name}?</span></Heading>
      <Button onClick={_ => handleDelete()}>Yes</Button> <Button bg='positive' >No</Button>
    </>
  )

}

export default TransactionDelete