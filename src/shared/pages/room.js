import React, {Component} from 'react'
import Layout from '../components/Layout/Layout'
import fetch from 'isomorphic-fetch'

export default class Room extends Component {
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
      info: initialData
    }
  }
  static requestInitialData (callback, params) {
    fetch(`https://floating-ravine-77277.herokuapp.com/api/room/${params.id}`)
      .then(response => response.json())
      .then(callback)
      .catch(error => { console.log(error) })
  }
  componentDidMount () {
    const {params} = this.props.match
    if (!this.state.info) {
      Room.requestInitialData(info => {
        this.setState({info})
      }, params)
    }
  }
  render () {
    return (
      <Layout page='room'>
      {
        (this.state.info)
          ? (<div>
            id: {this.state.info._id}<br />
            name: {this.state.info.name}<br />
            minAge: {this.state.info.minAge}<br />
            </div>
          )
          : <p>loading...</p>
        }
      }
      </Layout>
    )
  }
}
