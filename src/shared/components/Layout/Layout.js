import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import routes from '../../routes'
import './default.css'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

export default class extends Component {
  render () {
    return (
      <div>
        <Header />
        <Switch>
          {routes.map((route, i) => <Route key={i} {...route} />)}
        </Switch>
        <Footer />
        {this.props.children}
      </div>
    )
  }
}
