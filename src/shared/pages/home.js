import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import PrintRooms from '../components/PrintRooms/PrintRooms'
import {getMyRooms} from '../services/rooms'

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
    getMyRooms(data => {
      if (data.success === false) {
        console.log(data)
      } else {
        callback(data)
      }
    })
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
        <h1>Home</h1>
        <p>{this.props.filters.address}</p>
        <PrintRooms rooms={this.state.rooms} />
      </div>
    )
  }
}
