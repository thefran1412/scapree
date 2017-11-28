import React, {Component} from 'react'
import PrintRooms from '../components/PrintRooms/PrintRooms'
import fetch from 'isomorphic-fetch'
import {objectToQuery, stateToObject} from '../services/common'
import {getRooms} from '../services/rooms'
import queryString from 'query-string'

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
    getRooms(query, callback)
  }
  componentDidMount () {
    const obj = stateToObject(this.props.filters)
    if (!this.state.rooms) {
      Index.requestInitialData(rooms => {
        this.setState({rooms})
      }, {}, obj)
    }
  }
  componentWillReceiveProps (nextProps) {
    const oldProps = JSON.stringify(this.props.filters)
    const newProps = JSON.stringify(nextProps.filters)

    if (newProps !== oldProps) {
      const obj = stateToObject(nextProps.filters)
      console.log(nextProps.filters, obj)
      const url = '/' + objectToQuery(obj)

      this.props.history.push(url)

      Index.requestInitialData(rooms => {
        this.setState({rooms})
      }, {}, obj)
    }
  }
  render () {
    return (
      <div>
        <PrintRooms rooms={this.state.rooms} />
      </div>
    )
  }
}

export default Index
