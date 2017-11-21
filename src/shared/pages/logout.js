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
        console.log('1')
        this.props.logout()
        console.log('2')
        this.setState({
          done: true
        })
        console.log('3')
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
