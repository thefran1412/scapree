import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './LoginForm.css'

export default class LoginForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      username: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit (e) {
    e.preventDefault()
    this.props.submit(this.state)
  }
  render () {
    return (
      <form onSubmit={this.handleSubmit} id='loginForm'>
        <h1>Login</h1>
        <input
          type='text'
          name='username'
          placeholder='Username'
          value={this.state.username}
          onChange={this.handleChange}
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          value={this.state.password}
          onChange={this.handleChange}
        />
        <input
          style={{marginRight: '20px'}}
          type='submit'
          value='Login'
          className='loginButton'
        />
        <Link to='/register' className='loginButton'>
          Register
        </Link>
      </form>
    )
  }
}
