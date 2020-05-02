import React from 'react'
import { useParams } from "react-router";

function AccountDetails({ account }) {

  return (
    <p>{account.name}</p>
  )

}

export default AccountDetails