import React, {Component} from 'react'

export default class extends Component {
  constructor () {
    super()
    this.state = {
      text: '',
      number: '',
      date: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange (e) {
    this.setState({
      [e.target.type]: e.target.value
    })
  }
  handleSubmit (e) {
    e.preventDefault()
    console.log(this.state.value)
  }
  render () {
    return (
      <div id='headerForm'>
        <form onSubmit={this.handleSubmit}>
          <input type='text' onChange={this.handleChange} value={this.state.value} placeholder='Location' />
          <input type='number' onChange={this.handleChange} />
          <input type='date' onChange={this.handleChange} />
        </form>
      </div>
    )
  }
}
