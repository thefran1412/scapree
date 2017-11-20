import React, {Component} from 'react'
import Room from '../Room/Room'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      rooms: []
    }
  }
  componentWillMount () {
    if (this.props.rooms) {
      this.setState({
        rooms: this.props.rooms
      })
    }
  }
  componentWillReceiveProps (next) {
    this.setState({
      rooms: next.rooms
    })
  }
  render () {
    return (
      <div>
        {
          this.state.rooms
          ? this.state.rooms.map((room, item) => {
            return (<Room info={room} key={item} />)
          })
          : <p>Nothing found</p>
        }
      </div>
    )
  }
}
