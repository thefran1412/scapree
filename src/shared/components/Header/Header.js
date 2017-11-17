import React, {Component} from 'react'
import UserControl from '../UserControl/UserControl'
import HeaderForm from '../HeaderForm/HeaderForm.js'
import {Link} from 'react-router-dom'
import './Header.css'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      logged: false
    }
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
          <HeaderForm />
          {
            this.state.logged
          ? <UserControl profileImg='http://localhost:3000/static/img/default-profile.png' />
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
