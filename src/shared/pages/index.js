import React, {Component} from 'react'
import Layout from '../components/Layout/Layout'
import PrintRooms from '../components/PrintRooms/PrintRooms'

export default class Index extends Component {
  constructor (props) {
    super(props)
    this.state = {
      rooms: []
    }
  }
  componentWillMount () {
    this.setState({
      rooms: this.props.data
    })
  }
  render () {
    return (
      <Layout page='home'>
        <PrintRooms rooms={this.state.rooms} />
      </Layout>
    )
  }
}

// Index.getInitialProps = async function () {
//   const res = await fetch('http://localhost:3000/api/rooms')
//   const data = await res.json()

//   console.log(`Show data fetched. Count: ${data.length}`)

//   return {data}
// }
