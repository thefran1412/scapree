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
    console.log('initial daaaat', initialData)
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
    return (
      <div id='companie'>
        <div
          className='coverImg'
          style={{backgroundImage: profileImg}}
        />
        <div className='container'>
          <h1>{this.state.name}</h1>
          <div>
            <div className='companieDetailed'>
              detailed
            </div>
            <div className='mapWrapper'>
              <Maps
                coords={[59.938043, 30.337157]}
                address='Passatge de Frigola, 14, Barcelona, Spain'
              />
            </div>
          </div>
          <h2>Rooms</h2>
          <PrintRooms rooms={this.state.rooms} />
        </div>
      </div>
    )
  }
}
