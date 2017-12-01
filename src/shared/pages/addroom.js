import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {addRoom} from '../services/rooms'
import ModifyRoom from '../components/ModifyRoom/ModifyRoom'

export default class AddRoom extends Component {
  constructor (props) {
    super(props)

    this.state = {
      name: '',
      desc: '',
      minAge: undefined,
      minPeople: undefined,
      maxPeople: undefined,
      duration: undefined,
      difficulty: undefined,
      price: undefined,
      location: {
        address: '',
        coordinates: []
      },
      reservation: '',
      profileImg: 'default.png'
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit (data) {
    addRoom(data, response => {
      if (response._id) {
        this.props.history.push('/home')
      } else {
        alert(response.msg)
      }
    })
  }
  render () {
    if (!this.props.logged) {
      return <Redirect to='/login' />
    }
    return (
      <div>
        <ModifyRoom submit={this.handleSubmit} data={this.state} />
      </div>
    )
  }
}
