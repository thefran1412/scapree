import React, {Component} from 'react'
import './CreateCompany.css'
import UploadImg from '../../components/UploadImg/UploadImg'
// import {Redirect} from 'react-router-dom'

export default class CreateCompany extends Component {
  constructor (props) {
    super(props)
    const {data} = this.props
    if (this.props.data) {
      this.state = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        desc: data.desc,
        profileImg: data.profileImg,
        coverImg: data.coverImg
      }
    } else {
      this.state = {
        name: '',
        email: '',
        phone: '',
        desc: '',
        profileImg: 'default.png',
        coverImg: 'default.png'
      }
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleFileChange = this.handleFileChange.bind(this)
  }
  handleSubmit (e) {
    e.preventDefault()
    this.props.submit(this.state)
  }
  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleFileChange (imageName, state) {
    this.setState({
      [state]: imageName
    })
  }
  render () {
    return (
      <div id='createCompany'>
        <h1>Create Your company</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type='text'
            name='name'
            placeholder='Name'
            onChange={this.handleChange}
            value={this.state.name}
            required
          />
          <input
            type='email'
            name='email'
            placeholder='Email'
            onChange={this.handleChange}
            value={this.state.email}
            required
          />
          <input
            type='text'
            name='phone'
            placeholder='Phone'
            onChange={this.handleChange}
            value={this.state.phone}
            required
          />
          <textarea
            name='desc'
            placeholder='Desc'
            onChange={this.handleChange}
            value={this.state.desc}
            required
          />
          <UploadImg
            onChange={this.handleFileChange}
            img={this.state.coverImg}
            preview='cover'
            state='coverImg'
          />
          <UploadImg
            onChange={this.handleFileChange}
            img={this.state.profileImg}
            preview='profile'
            state='profileImg'
          />
          <input
            type='submit'
            name='profileImg'
            value='Envia'
            className='companieSubmit'
          />
        </form>

      </div>
    )
  }
}
