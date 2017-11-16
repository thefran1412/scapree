import React, {Component} from 'react'

export default class extends Component {
  render () {
    return (
      <div id='userControl'>
        <a>
          <img src={this.props.profileImg} />
        </a>
      </div>
    )
  }
}
