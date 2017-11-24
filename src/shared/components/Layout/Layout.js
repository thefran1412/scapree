import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import routes from '../../routes'
import './default.css'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import {checkToken} from '../../services/auth'
import store from 'store'
// import {geolocated} from 'react-geolocated'
// import Geolocation from 'react-geolocation'
import {getCoordsInfo} from '../../services/location'

export default class extends Component {
  constructor (props) {
    super(props)
    console.log('props', props)

    // setting user
    let user
    let query
    if (__isBrowser__) {
      user = window.__user__
      delete window.__user__

      query = window.__query__
      delete window.__query__
    } else {
      user = props.user
      query = props.query
    }

    // setting logged
    let logged
    if (user === 'unregistered') {
      logged = false
    } else {
      logged = true
    }

    // parse query
    const coords = []
    if (query.lat && query.long) {
      coords.push(+query.lat, +query.long)
    }
    // setting state
    this.state = {
      user: user,
      logged: logged,
      filters: {
        location: {},
        people: query.people ? +query.people : 0,
        address: coords.length && query.address ? query.address : '',
        coords: coords
      }
    }

    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.setUserInfo = this.setUserInfo.bind(this)
    this.setLocation = this.setLocation.bind(this)
    this.updateState = this.updateState.bind(this)
  }
  updateState (object) {
    this.setState(object)
  }
  setUserInfo (logged, user = 'unregistered') {
    this.updateState({user, logged})
    if (user === 'unregistered') store.remove('token')
  }
  login (user = 'unregistered', token) {
    if (token) {
      checkToken(token, response => {
        if (response.success) {
          this.setUserInfo(true, user)
        } else {
          this.setUserInfo(false)
        }
      })
    }
  }
  logout () {
    this.setUserInfo(false)
  }
  componentDidMount () {
    this.login(this.props.token)
  }
  setLocation (position) {
    const coords = position.coords
    getCoordsInfo(coords, response => {
      this.updateState({
        location: {
          coords: [coords.latitude, coords.longitude],
          city: response
        }
      })
    })
  }
  render () {
    return (
      <div>
        <Header
          logged={this.state.logged}
          login={this.login}
          user={this.state.user}
          filters={this.state.filters}
          updateState={this.updateState}
        />
        <Switch>
          {routes.map((route, i) => (
            <Route key={i} exact={route.exact} path={route.path} render={props => (
              <div>
                <route.component
                  logged={this.state.logged}
                  login={this.login}
                  user={this.state.user}
                  logout={this.logout}
                  filters={this.state.filters}
                  updateState={this.updateState}
                  {...props}
                />
              </div>
            )} />
          ))}
        </Switch>
        <Footer />
      </div>
    )
  }
}
