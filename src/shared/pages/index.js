import React, {Component} from 'react'
import Layout from '../components/Layout/Layout'
import PrintRooms from '../components/PrintRooms/PrintRooms'
import fetch from 'isomorphic-fetch'

class Index extends Component {
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
    fetch('http://localhost:3000/api/rooms')
      .then(response => response.json())
      .then(callback)
      .catch(error => { console.log(error) })
  }
  componentDidMount () {
    if (!this.state.rooms) {
      Index.requestInitialData(rooms => {
        this.setState({rooms})
      })
    }
  }
  render () {
    return (
      <Layout page='home'>
        <PrintRooms rooms={this.state.rooms} />
      </Layout>
    )
  }
}

export default Index
