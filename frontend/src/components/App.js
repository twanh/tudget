import React from 'react';
import { useEffect, useState } from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation
} from 'react-router-dom'

import { Provider } from "react-redux";
import store from '../redux/store'

import Layout from './general/layout'
import Routes from './general/routes';


export default function Home() {

  return (
    <Layout>
      <Routes />
    </Layout>
  )
}
