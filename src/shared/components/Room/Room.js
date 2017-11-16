import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './room.css'

export default class Room extends Component {
  render () {
    return (
      <div className='room'>
        <Link to={`/room/${this.props.info._id}`}>
          {this.props.info.name}
        </Link>
      </div>
    )
  }
}
