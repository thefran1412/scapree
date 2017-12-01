import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {editRoom, getRoom, deleteRoom} from '../services/rooms'
import ModifyRoom from '../components/ModifyRoom/ModifyRoom'

export default class EditRoom extends Component {
  constructor (props) {
    super(props)

    let initialData
    if (__isBrowser__) {
      initialData = window.__initialData__
      delete window.__initialData__
    } else {
      initialData = props.staticContext.initialData
    }

    this.state = {...initialData}

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }
  static requestInitialData (callback, params) {
    getRoom(params.id, callback)
  }
  handleSubmit (data) {
    editRoom(data, response => {
      if (response.success) {
        this.props.history.push('/home')
      } else {
        alert(response.msg)
      }
    })
  }
  handleDelete () {
    if (confirm('Seguro que quieres eliminar este elemento?')) {
      deleteRoom(this.state, response => {
        if (response.success) {
          this.props.history.push('/home')
        } else {
          alert(response.msg)
        }
      })
    }
  }
  componentDidMount () {
    document.documentElement.scrollTop = 0

    const {params} = this.props.match
    if (!this.state.info) {
      EditRoom.requestInitialData(info => {
        this.setState(info, this.getColor)
      }, params)
    }
    window.addEventListener('scroll', this.handleScroll)
  }
  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll)
  }
  render () {
    if (!this.props.logged) {
      return <Redirect to='/login' />
    }
    return (
      <div>
        <h1>Add Room</h1>
        {
          this.state.name
          ? <ModifyRoom submit={this.handleSubmit} data={this.state} delete={this.handleDelete} />
          : 'Loading...'
        }
      </div>
    )
  }
}
