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
    var doLogin = this.props.login
    login(info.username, info.password, answer => {
      if (answer.success) {
        store.set('token', answer.token)
        doLogin(answer.user, answer.token)
      } else {
        alert(answer.message)
      }
    })
  }
  render () {
    if (this.props.logged) {
      return <Redirect to='/home' />
    }
    return (
      <div style={{height: 'calc(100vh - 260px)'}}>
        <LoginForm submit={this.handleSubmit} />
      </div>
    )
  }
}
