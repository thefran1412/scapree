import React, {Component} from 'react'
import LoginForm from '../components/LoginForm/LoginForm'
import {login} from '../services/auth'
import store from 'store'
import {Redirect} from 'react-router-dom'
export default class Login extends Component {
  constructor (props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit (info) {
    var logged = this.props.setLogged
    login(info.username, info.password, function (answer) {
      if (answer.success) {
        store.set('token', answer.token)
        logged(true)
      } else {
        alert(answer.message)
        logged(false)
      }
    })
  }
  render () {
    if (this.props.logged) {
      return <Redirect to='/' />
    }
    return (
      <div>
        <h1>Login</h1>
        <LoginForm submit={this.handleSubmit} />
      </div>
    )
  }
}
