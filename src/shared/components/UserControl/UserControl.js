import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class extends Component {
  render () {
    return (
      <div id='userControl'>
        <Link to='/logout'>Logout</Link>
      </div>
    )
  }
}