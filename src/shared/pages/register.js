import React, {Component} from 'react'
import RegisterForm from '../components/RegisterForm/RegisterForm'
import {register} from '../services/auth'
import store from 'store'
import {Redirect} from 'react-router-dom'

export default class Register extends Component {
  constructor (props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit (info) {
    register(info, data => {
      console.log(data)
    })
  }
  render () {
    if (this.props.logged) {
      return <Redirect to='/' />
    }
    return (
      <div>
        <h1>Register</h1>
        <RegisterForm submit={this.handleSubmit} />
      </div>
    )
  }
}
