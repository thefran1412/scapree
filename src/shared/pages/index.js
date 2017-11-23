import React, {Component} from 'react'
import PrintRooms from '../components/PrintRooms/PrintRooms'
import fetch from 'isomorphic-fetch'
import {objectToQuery} from '../services/common'
import {getRooms} from '../services/rooms'
// import queryString from 'query-string'

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
  static requestInitialData (callback, params, query) {
    console.log(query)
    getRooms(query, callback)
  }
  componentDidMount () {
    console.log('mounted')
    if (!this.state.rooms) {
      Index.requestInitialData(rooms => {
        this.setState({rooms})
      })
    }
  }
  componentWillReceiveProps (nextProps) {
    // compare if props changed
    const oldProps = JSON.stringify(this.props.filters)
    const newProps = JSON.stringify(nextProps.filters)

    if (newProps !== oldProps) {
      // if they did change
      console.log(nextProps)
      console.log('update props')
      // change url
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

      // get data again
      Index.requestInitialData(rooms => {
        this.setState({rooms})
      }, {}, obj)
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
