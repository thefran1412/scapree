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
      console.log(this.props.rooms)
      this.setState({
        rooms: this.props.rooms
      })
    }
  }
  render () {
    return (
      <div>
        {
          this.state.rooms.map((room, item) => {
            return (
              <Room info={room} key={item} />
            )
          })
        }
      </div>
    )
  }
}
