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
  componentDidMount () {
    this.selectOne()
  }
  handleChange (e) {
    const orderBy = JSON.parse(e.target.value)
    this.setState(orderBy, () => {
      const filters = {...this.props.filters}
      filters.order = this.state.order
      filters.direction = this.state.direction

      this.props.updateState({filters})
    }, this.selectOne)
  }
  componentWillReceiveProps (nextProps) {
    const oldProps = JSON.stringify(this.props.filters)
    const newProps = JSON.stringify(nextProps.filters)
    if (oldProps !== newProps) {
      this.setState({
        order: nextProps.filters.order,
        direction: nextProps.filters.direction
      }, this.selectOne)
    }
  }
  selectOne () {
    let id = this.state.order + this.state.direction
    if (!id) id = 'order'
    const everyElement = document.getElementsByClassName('sel')
    Array.prototype.forEach.call(everyElement, el => {
      el.removeAttribute('selected')
    })
    const element = document.getElementById(id)
    element.setAttribute('selected', 'selected')
  }

  render () {
    return (
      <div className='order'>
        <select onChange={this.handleChange}>
          <option id='order' className='sel' value={JSON.stringify({order: '', direction: ''})}>Ordena</option>
          <option id='priceasc' className='sel' value={JSON.stringify({order: 'price', direction: 'asc'})}>Baratos</option>
          <option id='pricedesc' className='sel' value={JSON.stringify({order: 'price', direction: 'desc'})}>Caros</option>
          <option id='locationasc' className='sel' value={JSON.stringify({order: 'location', direction: 'asc'})}>Más cerca</option>
          <option id='durationdesc' className='sel' value={JSON.stringify({order: 'duration', direction: 'desc'})}>Duración</option>
          <option id='difficultydesc' className='sel' value={JSON.stringify({order: 'difficulty', direction: 'desc'})}>Dificultad</option>
        </select>
      </div>
    )
  }
}
