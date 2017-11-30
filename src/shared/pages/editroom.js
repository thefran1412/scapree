import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class EditRoom extends Component {
  constructor (props) {
    super(props)
    this.state = {
      rooms: []
    }
  }
  render () {
    return (
      <div id='editRoom'>
        <p>Edit Room</p>
      </div>
    )
  }
}
