import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import routes from '../../routes'
import './default.css'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import {checkToken} from '../../services/auth'
import store from 'store'
// import {geolocated} from 'react-geolocated'
import Geolocation from 'react-geolocation'
import {getCoordsInfo} from '../../services/location'

export default class extends Component {
  constructor (props) {
    super(props)
    console.log('props', props)

    // setting user
    let user
    if (__isBrowser__) {
      user = window.__user__
      delete window.__user__
    } else {
      user = props.user
    }

    // setting logged
    let logged
    if (user === 'unregistered') {
      logged = false
    } else {
      logged = true
    }

    // setting state
    this.state = {
      user: user,
      logged: logged,
      location: ''
    }

    this.setUserInfo = this.setUserInfo.bind(this)
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.setLocation = this.setLocation.bind(this)
  }
  setUserInfo (logged, user = 'unregistered') {
    this.setState({
      user: user,
      logged: logged
    })
    if (user === 'unregistered') {
      store.remove('token')
    }
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
    console.log(position)
    const coords = position.coords
    getCoordsInfo(coords, response => {
      this.setState({
        location: {coords: {lat: coords.latitude, long: coords.longitude}, city: response}
      })
    })
  }
  render () {
    return (
      <div>
        <Geolocation onSuccess={this.setLocation} />
        <Header
          logged={this.state.logged}
          login={this.login}
          user={this.state.user}
          location={this.state.location}
        />
        <Switch>
          {routes.map((route, i) => (
            <Route key={i} exact={route.exact} path={route.path} render={props => (
              <route.component
                logged={this.state.logged}
                login={this.login}
                user={this.state.user}
                logout={this.logout}
                location={this.state.location}
                {...props}
              />
            )} />
          ))}
        </Switch>
        <Footer />
      </div>
    )
  }
}
