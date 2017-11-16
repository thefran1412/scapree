import React, {Component} from 'react'
import Layout from '../components/Layout/Layout'
// import {getRoom} from '../services/api.js'

export default class Room extends Component {
  constructor (props) {
    super(props)
    this.state = {
      info: {}
    }

    this.room = this.room.bind(this)
  }
  // static async getInitialProps ({query}) {
  //   const ress = await fetch(`http://localhost:3000/api/room/${query.id}`)
  //   const data = await ress.json()

  //   return {data}
  // }
  room () {
    // getRoom({_id: 'id'}, (data) => {
    //   this.setState({
    //     rooms: data.data
    //   })
    // })
  }
  componentWillMount () {
    console.log(this.props.data)
    // this.room()
  }
  render () {
    return (
      <Layout page='room'>
        id: {this.props.data._id}<br />
        name: {this.props.data.name}<br />
        minAge: {this.props.data.minAge}<br />
      </Layout>
    )
  }
}

// Room.getInitialProps = async function ({query}) {
// }
