import React, {Component} from 'react'
import Room from '../Room/Room'
import {Link} from 'react-router-dom'
import './PrintRooms.css'

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
      <div className='rooms'>
        {
          this.state.rooms.length
          ? this.state.rooms.map((room, item) => {
            return (<Room info={room} key={item} from={this.props.from || ''} />)
          })
          : <p>Nothing found</p>
        }
        {
          (this.props.from === 'home')
          ? (
            <div className='room'>
              <Link to='/room/add' className='roomLink'>
                <div className='roomPoster'>
                  <div className='addRoom'>
                    <img src='/static/media/plus.svg' width='50' />
                  </div>
                </div>
              </Link>
            </div>
          )
          : ''
        }
      </div>
    )
  }
}
