import React, {Component} from 'react'
import './default.css'
import Header from '../Header/Header'

export default class extends Component {
  render () {
    if (!this.props.page) {
      this.props.page = 'Undefinied'
    }
    return (
      <div>
        <h1>{this.props.page}</h1>
        {this.props.children}
      </div>
    )
  }
}
