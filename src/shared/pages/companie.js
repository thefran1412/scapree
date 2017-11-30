import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {getCompanie} from '../services/companies'
import './companie.css'
import PrintRooms from '../components/PrintRooms/PrintRooms'
import Maps from '../components/Maps/Maps'

export default class Companie extends Component {
  constructor (props) {
    super(props)

    let initialData
    if (__isBrowser__) {
      initialData = window.__initialData__
      delete window.__initialData__
    } else {
      initialData = props.staticContext.initialData
    }
    if (initialData && initialData.success) {
      this.state = {...initialData.data.companie, rooms: initialData.data.rooms}
    } else {
      this.state = {
        name: '', desc: '', profileImg: 'default.png', created: '', location: {}, contact: {}, rooms: []
      }
    }
  }
  static requestInitialData (callback, params) {
    getCompanie(params.id, callback)
  }
  componentDidMount () {
    document.documentElement.scrollTop = 0

    const {params} = this.props.match
    if (!this.state.info) {
      Companie.requestInitialData(response => {
        if (response.success) {
          const obj = {...response.data.companie, rooms: response.data.rooms}
          this.setState(obj)
        }
      }, params)
    }
  }
  render () {
    const profileImg = `url(/static/uploads/${this.state.profileImg})`
    const coverImg = `url(/static/uploads/${this.state.coverImg})`
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
          <h1>{this.state.name}</h1>
          <div>
            <div className='companieDetailed'>
              {
                this.state.contact
                ? (
                  <div>
                    <div className='descInfo'>
                      <h3>Descripción</h3>
                      <p>{this.state.desc}</p>
                    </div>
                    <div className='contactInfo'>
                      <h3>Contacto</h3>
                      <a href={`mailto:${this.state.email}`}>
                        <img src={mail} width='15' /><p>{this.state.contact.email}</p>
                      </a>
                      <a href={`tel:${this.state.phone}`}>
                        <img src={phone} width='15' /><p>{this.state.contact.phone}</p>
                      </a>
                    </div>
                  </div>
                )
                : 'Loading'
              }
            </div>
            <div className='mapWrapper'>
              {
                this.state.rooms.length
                ? (<Maps
                  coords={this.state.rooms[0].location.coordinates}
                  address={this.state.rooms[0].location.address}
                />)
                : 'Loading...'
              }
            </div>
          </div>
          <h2>Rooms</h2>
          <PrintRooms rooms={this.state.rooms} />
        </div>
      </div>
    )
  }
}
