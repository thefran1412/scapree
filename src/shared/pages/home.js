import React, {Component} from 'react'
import LoginForm from '../components/LoginForm/LoginForm'
import {Redirect} from 'react-router-dom'

export default class Login extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    if (!this.props.logged) {
      return <Redirect to='/login' />
    }
    return (
      <div>
        <h1>Home</h1>
      </div>
    )
  }
}
