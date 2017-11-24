import React from 'react'
import {render} from 'react-dom'
import Layout from '../shared/components/Layout/Layout'
import {BrowserRouter} from 'react-router-dom'

render(
  <BrowserRouter>
    <Layout url={window.location.href} />
  </BrowserRouter>,
  document.getElementById('root')
)
