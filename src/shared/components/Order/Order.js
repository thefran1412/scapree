import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import './Order.css'

export default class AddRoom extends Component {
  constructor (props) {
    super(props)

    this.state = {
      order: this.props.filters.order,
      direction: this.props.filters.direction
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange (e) {
    const orderBy = JSON.parse(e.target.value)
    this.setState(orderBy, () => {
      const filters = {...this.props.filters}
      filters.order = this.state.order
      filters.direction = this.state.direction

      this.props.updateState({filters})
    })
  }
  render () {
    return (
      <div className='order'>
        <select onChange={this.handleChange}>
          <option value={JSON.stringify({order: '', direction: ''})} selected>Ordena</option>
          <option value={JSON.stringify({order: 'price', direction: 'asc'})}>Baratos</option>
          <option value={JSON.stringify({order: 'price', direction: 'desc'})}>Caros</option>
          <option value={JSON.stringify({order: 'location', direction: 'asc'})}>Más cerca</option>
          <option value={JSON.stringify({order: 'duration', direction: 'desc'})}>Duración</option>
          <option value={JSON.stringify({order: 'difficulty', direction: 'desc'})}>Dificultad</option>
        </select>
      </div>
    )
  }
}
