import React, {Component} from 'react'
import './SideBar.css'
import {Link} from 'react-router-dom'

export default class SideBar extends Component {
  componentWillMount () {
    console.log(this.props)
  }
  render () {
    const img = `/static/uploads/${this.props.profileImg}`
    const phone = '/static/media/phone.svg'
    const mail = '/static/media/mail.svg'
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
                <img src={mail} width='15' />
                <p>{this.props.companie.email}</p>
              </a>
              <a href={`tel:${this.props.companie.phone}`}>
                <img src={phone} width='15' />
                <p>{this.props.companie.phone}</p>
              </a>
            </div>)
            : 'Loading'
          }
          <a target='_blank' href={this.props.reservation} id='book' style={{backgroundColor: this.props.rgb}}>Reservar</a>
        </div>
      </div>
    )
  }
}
