import React, {Component} from 'react'
import './RegisterForm.css'

export default class RegisterForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      username: '',
      email: '',
      name: '',
      password: '',
      alsoPassword: '',
      userType: 'user'
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
      <form onSubmit={this.handleSubmit} id='registerForm'>
        <input
          type='text'
          name='username'
          placeholder='Username'
          value={this.state.username}
          onChange={this.handleChange}
          required
        />
        <input
          type='text'
          name='name'
          placeholder='Name'
          value={this.state.name}
          onChange={this.handleChange}
          required
        />
        <input
          type='email'
          name='email'
          placeholder='Email'
          value={this.state.email}
          onChange={this.handleChange}
          required
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          value={this.state.password}
          onChange={this.handleChange}
          required
        />
        <input
          type='password'
          name='alsoPassword'
          placeholder='Repeat Password'
          value={this.state.alsoPassword}
          onChange={this.handleChange}
          required
        />
        <input
          type='submit'
          value='Register'
        />
      </form>
    )
  }
}
