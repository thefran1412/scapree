import React, {Component} from 'react'
import './SideBar.css'
import {Link} from 'react-router-dom'

export default class SideBar extends Component {
  componentWillMount () {
    console.log(this.props)
  }
  render () {
    const img = `/static/uploads/${this.props.profileImg}`
    const reservation = 'https://www-24c.bookeo.com/bookeo/b_escapehuntbarcelona_start.html'
    return (
      <div id='sideBar'>
        <div id='poster' style={{backgroundImage: `url(${img})`}} />
        <div className='roomInfo'>
          {
            this.props.companie
            ? (
              <Link to={`/companie/${this.props.companie._id}`} className='companieInfo'>
                <p>{this.props.companie.name}</p>
                <div className='profileImg' style={{backgroundImage: `url('/static/uploads/${this.props.companie.profileImg}')`}} />
              </Link>
            )
            : 'Loading...'
          }

          {
            this.props.companie
            ? (<div className='contactInfo'>
              <a href={`mailto:${this.props.companie.email}`}>
                {this.props.companie.contact.email}
              </a>
              <a href={`tel:${this.props.companie.phone}`}>
                {this.props.companie.contact.phone}
              </a>
            </div>)
            : 'Loading'
          }
          <a target='_blank' href={reservation} id='book' style={{backgroundColor: this.props.rgb}}>Reservar</a>
        </div>
      </div>
    )
  }
}
