import React, {Component} from 'react'
import UserControl from '../UserControl/UserControl'
import Filters from '../Filters/Filters.js'
import {Link} from 'react-router-dom'
import './Header.css'

export default class extends Component {
  constructor (props) {
    super(props)

    this.state = {
      user: this.props.user,
      logged: this.props.logged
    }
    this.emptyFilters = this.emptyFilters.bind(this)
  }
  componentWillReceiveProps (props) {
    this.setState({
      user: props.user,
      logged: props.logged
    })
  }
  emptyFilters () {
    this.props.updateState({
      filters: {
        address: '',
        coords: [],
        direction: '',
        order: '',
        people: 0
      }
    })
  }
  render () {
    return (
      <header>
        <nav>
          <div className='headerLogo'>
            <Link to='/' onClick={this.emptyFilters}>
              <h1>Scapree</h1>
            </Link>
          </div>
          <Filters updateState={this.props.updateState} filters={this.props.filters} />
          <Link to='/home' className='homeLink'>
            <h1>Home</h1>
          </Link>
          {
            this.state.logged
            ? <UserControl />
            : <div className='headerLogin'>
              <Link to='/register'>Sign Up</Link>
              <Link to='/login'>Sign In</Link>
            </div>
          }
        </nav>
      </header>
    )
  }
}
