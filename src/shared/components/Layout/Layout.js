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
        <head>
          <meta charSet='UTF-8' />
          <title>{this.props.page}</title>
        </head>
        <div>
          <Header />
          <h1>{this.props.page}</h1>
          {this.props.children}
        </div>
      </div>
    )
  }
}
