import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import routes from '../../routes'
import './default.css'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import {checkToken} from '../../services/auth'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      logged: false
    }

    this.logged = this.logged.bind(this)
    this.verifyToken = this.verifyToken.bind(this)
  }
  logged (value) {
    this.setState({
      logged: value
    })
  }
  verifyToken (token) {
    if (token) {
      checkToken(token, response => {
        if (response.success) {
          this.logged(true)
        } else {
          this.logged(false)
        }
      })
    }
  }
  componentWillMount () {
    this.verifyToken(this.props.token)
  }
  render () {
    return (
      <div>
        <Header logged={this.state.logged} />
        <Switch>
          {routes.map((route, i) => (
            <Route key={i} exact={route.exact} path={route.path} render={props => (
              <route.component setLogged={this.logged} {...props} logged={this.state.logged} />
            )} />
          ))}
        </Switch>
        <Footer />
      </div>
    )
  }
}
