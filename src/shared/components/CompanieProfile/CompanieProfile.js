import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PrintRooms from '../../components/PrintRooms/PrintRooms'
import Maps from '../../components/Maps/Maps'
import './CompanieProfile.css'

export default class CompanieProfile extends Component {
  componentWillMount () {
    console.log('rendering with: ', this.props)
  }
  componentDidMount () {
    console.log('rendered with: ', this.props)
  }
  render () {
    const profileImg = `url(/static/uploads/${this.props.data.profileImg})`
    const coverImg = `url(/static/uploads/${this.props.data.coverImg})`
    const phone = '/static/media/phone.svg'
    const mail = '/static/media/mail.svg'
    return (
      <div id='companie'>
        <div
          className='coverImg'
          style={{backgroundImage: coverImg}}
        />
        <div className='container'>
          <div className='bigProfileImg' style={{backgroundImage: profileImg}} />
          <h1>{this.props.data.name}</h1>
          <p>{this.props.from}</p>
          <div>
            <div className='companieDetailed'>
              {
                this.props.data.contact
                ? (
                  <div>
                    <div className='descInfo'>
                      <h3>Descripción</h3>
                      <p>{this.props.data.desc}</p>
                    </div>
                    <div className='contactInfo'>
                      <h3>Contacto</h3>
                      <a href={`mailto:${this.props.data.email}`}>
                        <img src={mail} width='15' /><p>{this.props.data.contact.email}</p>
                      </a>
                      <a href={`tel:${this.props.data.phone}`}>
                        <img src={phone} width='15' /><p>{this.props.data.contact.phone}</p>
                      </a>
                    </div>
                  </div>
                )
                : 'Loading'
              }
            </div>
            <div className='mapWrapper'>
              {
                this.props.data.rooms.length
                ? (<Maps
                  coords={this.props.data.rooms[0].location.coordinates}
                  address={this.props.data.rooms[0].location.address}
                />)
                : 'Loading...'
              }
            </div>
          </div>
          <h2>Rooms</h2>
          <PrintRooms rooms={this.props.data.rooms} />
        </div>
      </div>
    )
  }
}
