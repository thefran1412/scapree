import React from 'react'
import {render} from 'react-dom'
import Layout from '../shared/components/Layout/Layout'
import {BrowserRouter} from 'react-router-dom'
import store from 'store'

const token = store.get('token')

render(
  <BrowserRouter>
    <Layout token={token} />
  </BrowserRouter>,
  document.getElementById('root')
)
