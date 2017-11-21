import React, {Component} from 'react'
import {logout} from '../services/auth'
import {Redirect} from 'react-router-dom'
export default class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      done: false
    }

    this.logOut = this.logOut.bind(this)
  }
  logOut () {
    logout(response => {
      if (response.success) {
        this.props.logout()
        this.setState({
          done: true
        })
      }
    })
  }
  componentWillMount () {
    this.logOut()
  }
  render () {
    if (this.state.done) {
      return (<Redirect to='/' />)
    } else {
      return (<div>Logging out...</div>)
    }
  }
}
