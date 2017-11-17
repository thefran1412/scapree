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
  componentDidMount () {
    // if (!this.state.rooms) {
    console.log('eo')
    // console.log(Index.requestInitialData())

    Index.requestInitialData(response => {
      this.setState({
        rooms: response
      })
    })
  }
  static requestInitialData (callback) {
    // console.log('getting initial data')
      // .then(callback)
    fetch('http://localhost:3000/api/rooms')
      .then(response => response.json())
      .then(callback)
      .catch(error => console.log(error))
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

// Index.getInitialProps = async function () {
//   const res = await fetch('http://localhost:3000/api/rooms')
//   const data = await res.json()

//   console.log(`Show data fetched. Count: ${data.length}`)

//   return {data}
// }
