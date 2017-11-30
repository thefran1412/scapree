import React, {Component} from 'react'
import './RegisterForm.css'
import {checkUsername, checkEmail} from '../../services/auth'
import {Link} from 'react-router-dom'

export default class RegisterForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      username: {value: '', class: ''},
      email: {value: '', class: ''},
      name: {value: '', class: ''},
      password: {value: '', class: ''},
      alsoPassword: {value: '', class: ''},
      userType: 'user'
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.deleteError = this.deleteError.bind(this)
    this.setError = this.setError.bind(this)
    this.addError = this.addError.bind(this)
  }

  handleChange (e) {
    const name = e.target.name
    const value = e.target.value

    // change value
    const thisClass = this.state[name].class
    this.setState({
      [name]: {value: value, class: thisClass}
    })

    // change errors
    if (name === 'username' || name === 'email') {
      const func = (name === 'username')
        ? checkUsername
        : checkEmail

      func(value, data => {
        data.success
        ? this.deleteError(name)
        : this.addError(name)
      })
    }
  }

  setError (elementName, elementClass) {
    const element = this.state[elementName]
    this.setState({
      [elementName]: {value: element.value, class: elementClass}
    })
  }

  addError (elementName) {
    if (!this.state[elementName].class) {
      this.setError(elementName, 'validationError')
    }
  }

  deleteError (elementName) {
    if (this.state[elementName].class) {
      this.setError(elementName, '')
    }
  }

  handleSubmit (e) {
    e.preventDefault()
    let hasError = false
    let data = {}
    Object.keys(this.state).map((name, index) => {
      if (name === 'password' && this.state.password.value !== this.state.alsoPassword.value) {
        hasError = true
      } else if (this.state[name].class) {
        hasError = true
      } else {
        data[name] = this.state[name].value
      }
    })

    if (!hasError) {
      this.props.submit(data)
    }
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit} id='registerForm'>
        <h1>Register</h1>
        <input
          type='text'
          name='username'
          placeholder='Username'
          value={this.state.username.value}
          onChange={this.handleChange}
          className={this.state.username.class}
          required
        />
        <input
          type='text'
          name='name'
          placeholder='Name'
          value={this.state.name.value}
          onChange={this.handleChange}
          className={this.state.name.class}
          required
        />
        <input
          type='email'
          name='email'
          placeholder='Email'
          value={this.state.email.value}
          onChange={this.handleChange}
          className={this.state.email.class}
          required
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          value={this.state.password.value}
          onChange={this.handleChange}
          className={this.state.password.class}
          required
        />
        <input
          type='password'
          name='alsoPassword'
          placeholder='Repeat Password'
          value={this.state.alsoPassword.value}
          onChange={this.handleChange}
          className={this.state.alsoPassword.class}
          required
        />
        <input
          type='submit'
          value='Register'
          className='registerButton'
          style={{marginRight: '20px'}}
        />
        <Link to='/login' className='loginButton'>
          Login
        </Link>
      </form>
    )
  }
}
