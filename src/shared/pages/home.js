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
  static requestInitialData (callback) {
    let params = {
      people: 5
    }
    if (this && this.props.filters.coords) {
      params.lat = this.props.filters.coords.lat
      params.long = this.props.filters.coords.long
    }
    getRooms(params, callback)
  }
  componentDidMount () {
    if (!this.state.rooms) {
      Home.requestInitialData(rooms => {
        this.setState({rooms})
      })
    }
    console.log(this.props.location)
  }
  componentWillReceiveProps (nextProps) {
    const oldProps = JSON.stringify(this.props.filters)
    const newProps = JSON.stringify(nextProps.filters)

    if (newProps !== oldProps) {
      Home.requestInitialData(rooms => {
        this.setState({rooms})
      })
      console.log('update props')
    }
  }
  render () {
    // if (!this.props.logged) {
    //   return <Redirect to='/login' />
    // }
    return (
      <div>
        <Redirect to='?people=10&address=Barcelona,spain' />
        <h1>Home</h1>
        <p>{this.props.filters.address}</p>
        <PrintRooms rooms={this.state.rooms} />
      </div>
    )
  }
}
