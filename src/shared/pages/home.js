import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import PrintRooms from '../components/PrintRooms/PrintRooms'
import {getRooms} from '../services/rooms'

export default class Home extends Component {
  constructor (props) {
    super(props)

    let initialData
    if (__isBrowser__) {
      initialData = window.__initialData__
      delete window.__initialData__
    } else {
      initialData = props.staticContext.initialData
    }
    this.state = {
      rooms: initialData
    }
  }
  static requestInitialData (callback, route) {
    getRooms({people: 5}, callback)
  }
  componentDidMount () {
    if (!this.state.rooms) {
      Home.requestInitialData(rooms => {
        this.setState({rooms})
      })
    }
  }
  render () {
    // if (!this.props.logged) {
    //   return <Redirect to='/login' />
    // }
    return (
      <div>
        <h1>Home</h1>
        <PrintRooms rooms={this.state.rooms} />
      </div>
    )
  }
}
