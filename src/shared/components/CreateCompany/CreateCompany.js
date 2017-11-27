import React, {Component} from 'react'
import './CreateCompany.css'
// import {Redirect} from 'react-router-dom'

export default class CreateCompany extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      phone: '',
      desc: '',
      address: '',
      coords: [],
      profileImg: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleSubmit (e) {
    e.preventDefault()
    console.log(typeof this.props.submit)
    this.props.submit(this.state)
  }
  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render () {
    return (
      <div id='createCompany'>
        <h1>Create Your company</h1>
        <form onSubmit={this.handleSubmit}>
          <input type='text' name='name' placeholder='Name' onChange={this.handleChange} value={this.state.name} required />
          <input type='email' name='email' placeholder='Email' onChange={this.handleChange} value={this.state.email} required />
          <input type='text' name='phone' placeholder='Phone' onChange={this.handleChange} value={this.state.phone} required />
          <textarea name='desc' placeholder='Desc' onChange={this.handleChange} value={this.state.desc} required />
          <input type='file' name='profileImg' onChange={this.handleChange} value={this.state.profileImg} />
          <input type='submit' name='profileImg' value='Envia' />
        </form>

      </div>
    )
  }
}
