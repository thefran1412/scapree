import React, {Component} from 'react'
import UserControl from '../UserControl/UserControl'
import HeaderForm from '../HeaderForm/HeaderForm.js'
import {Link} from 'react-router-dom'
import './header.css'

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
              <a><h1>Scapree</h1></a>
            </Link>
          </div>
          <HeaderForm />
          {
            this.state.logged
          ? <UserControl profileImg='http://localhost:3000/static/img/default-profile.png' />
            : <div className='headerLogin'>
              <button>Sign Up</button>
              <button>Sign In</button>
            </div>
          }
        </nav>
      </header>
    )
  }
}
