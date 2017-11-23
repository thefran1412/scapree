import React, {Component} from 'react'
import PrintRooms from '../components/PrintRooms/PrintRooms'
import fetch from 'isomorphic-fetch'
import {objectToQuery} from '../services/common'

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
  static requestInitialData (callback) {
    // var url = 'https://floating-ravine-77277.herokuapp.com/api/rooms'
    var url = 'http://localhost:3000/api/rooms'
    fetch(url)
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
  componentWillReceiveProps (nextProps) {
    const oldProps = JSON.stringify(this.props.filters)
    const newProps = JSON.stringify(nextProps.filters)

    if (newProps !== oldProps) {
      console.log(nextProps)
      Index.requestInitialData(rooms => {
        this.setState({rooms})
      })
      console.log('update props')
      if (nextProps) {}
      const obj = {
        people: nextProps.filters.people
      }
      if (nextProps.filters.coords.length) {
        obj.lat = nextProps.filters.coords[0]
        obj.long = nextProps.filters.coords[1]
        obj.address = nextProps.filters.address
      }
      const url = '/' + objectToQuery(obj)
      console.log(url, this.props)
      this.props.history.push(url)
    }
  }
  render () {
    return (
      <div>
        <p>{this.props.filters.address}{this.props.filters.people}</p>
        <PrintRooms rooms={this.state.rooms} />
      </div>
    )
  }
}

export default Index
