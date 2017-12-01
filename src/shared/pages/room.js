import StarRatingComponent from 'react-star-rating-component'
import React, {Component} from 'react'
import * as Vibrant from 'node-vibrant'
import SideBar from '../components/SideBar/SideBar'
import Maps from '../components/Maps/Maps'
import {getRoom} from '../services/rooms'
import './room.css'

export default class Room extends Component {
  constructor (props) {
    super(props)

    let initialData
    if (__isBrowser__) {
      initialData = window.__initialData__
      delete window.__initialData__
    } else {
      initialData = props.staticContext.initialData
    }
    this.state = {
      ...initialData,
      rgb: 'rgb(195, 74, 74)',
      rgbdark: 'rgb(63, 63, 63)'
    }
    this.getColor = this.getColor.bind(this)
  }
  static requestInitialData (callback, params) {
    getRoom(params.id, callback)
  }
  handleScroll (e) {
    let scroll = document.documentElement.scrollTop
    let selector = document.getElementById('sectionSelector')
    let sideBar = document.getElementById('sideBar')
    let main = document.getElementById('mainSection')

    if (scroll >= 60) {
      selector.className = 'sectionSelectorFixed'
      sideBar.className = 'sideBarFixed'
      main.className = 'mainSectionFixed'
    } else {
      selector.className = ''
      sideBar.className = ''
      main.className = ''
    }
  }
  componentDidMount () {
    document.documentElement.scrollTop = 0

    const {params} = this.props.match
    if (!this.state.info) {
      Room.requestInitialData(info => {
        this.setState(info, this.getColor)
      }, params)
    }
    window.addEventListener('scroll', this.handleScroll)
  }
  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll)
  }
  handleClick (target) {
    if (target === window.location.hash) {
      window.location.hash = '#header'
    }
    window.location.hash = target
  }
  getColor () {
    if (this.state.profileImg && this.state.rgb === 'rgb(195, 74, 74)') {
      const img = `/static/uploads/${this.state.profileImg}`
      Vibrant.from(img).getPalette((err, palette) => {
        if (err) throw err
        if (palette.DarkMuted) {
          const rgbdark = palette.DarkMuted._rgb
          this.setState({
            rgbdark: ` rgb(${rgbdark.join()})`
          })
        }
        if (palette.Vibrant) {
          const rgb = palette.Vibrant._rgb
          this.setState({
            rgb: ` rgb(${rgb.join()})`
          })
        }
      })
    }
  }
  render () {
    const group = '/static/media/group_white.svg'
    const clock = '/static/media/clock_white.svg'

    let difficulty = '/static/media/'
    let difficultyAlt = ''
    if (this.state.difficulty <= 33) {
      difficulty += 'easy.svg'
      difficultyAlt = 'Facil'
    } else if (this.state.difficulty <= 66) {
      difficulty += 'medium.svg'
      difficultyAlt = 'Medio'
    } else if (this.state.difficulty <= 100) {
      difficulty += 'hard.svg'
      difficultyAlt = 'Dificil'
    }

    return (
      <div id='roomDetail'>
        <div>
          <div id='sectionSelector'>
            <ul>
              <li onClick={() => { this.handleClick('#summary') }}>Summary</li>
              <li onClick={() => { this.handleClick('#description') }}>Description</li>
              <li onClick={() => { this.handleClick('#ratings') }}>Ratings</li>
              <li onClick={() => { this.handleClick('#location') }}>Location</li>
            </ul>
          </div>
          <div id='mainSection'>
            <div id='summary' style={{backgroundColor: this.state.rgbdark}}>
              <h1>{this.state.name}</h1>
              <StarRatingComponent
                name='stars'
                starCount={5}
                value={4}
                starColor={this.state.rgb}
                emptyStarColor={'#e0e0e0'}
                editing={false}
              />
              <div className='address'>
                <p onClick={() => { this.handleClick('#location') }}>
                  {
                    this.state.location
                    ? this.state.location.address
                    : 'Loading...'
                  }
                </p>
              </div>
              <div className='summaryInfo'>
                <div>
                  <img src={group} width='15' title={`De ${this.state.minPeople} a ${this.state.maxPeople} personas`} alt='Personas' />
                  <p>{this.state.minPeople}-{this.state.maxPeople}</p>
                </div>
                <div>
                  <img src={clock} width='15' title={this.state.duration + ' minutos'} alt='Tiempo' />
                  <p>{this.state.duration} min.</p>
                </div>
                <div>
                  <img src={difficulty} title={difficultyAlt} alt={difficultyAlt} width='15' />
                  <p>{difficultyAlt}</p>
                </div>
              </div>
              <div id='price'>
                <p>{this.state.price} €</p>
              </div>
            </div>
            <div id='description'>
              <h4>Descripción</h4>
              <p>{this.state.desc}</p>
            </div>
            <div id='ratings'>
              <h4>Opiniones</h4>
            </div>
            <div id='location'>
              <h4>Ubicación</h4>
              {
                this.state.location
                ? (<Maps
                  coords={this.state.location.coordinates}
                  address={this.state.location.address}
                />)
                : 'Loading map'
              }
            </div>
          </div>
          <SideBar
            companie={this.state.companie}
            profileImg={this.state.profileImg}
            reservation={this.state.reservation}
            rgb={this.state.rgb}
          />
        </div>
      </div>
    )
  }
}
