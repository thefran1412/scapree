import React, {Component} from 'react'
import RegisterForm from '../components/RegisterForm/RegisterForm'
import {register} from '../services/auth'
import store from 'store'
import {Redirect} from 'react-router-dom'

export default class Register extends Component {
  constructor (props) {
    super(props)
    this.state = {
      registered: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit (info) {
    register(info, data => {
      if (data.success) {
        this.props.history.push('/login')
      }
    })
  }
  render () {
    return (
      <div>
        <h1>Register</h1>
        <RegisterForm submit={this.handleSubmit} />
      </div>
    )
  }
}
