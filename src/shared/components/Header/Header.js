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
  }
  componentWillReceiveProps (props) {
    this.setState({
      user: props.user,
      logged: props.logged
    })
  }
  render () {
    return (
      <header>
        <nav>
          <div className='headerLogo'>
            <Link to='/'>
              <h1>Scapree</h1>
            </Link>
          </div>
          <Filters />
          {
            this.state.logged
            ? <UserControl />
            : <div className='headerLogin'>
              <button><Link to='/register'>Sign Up</Link></button>
              <button><Link to='/login'>Sign In</Link></button>
            </div>
          }
        </nav>
      </header>
    )
  }
}
