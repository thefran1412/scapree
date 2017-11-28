import React, {Component} from 'react'
import fetch from 'isomorphic-fetch'
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
      ...initialData
    }
  }
  static requestInitialData (callback, params) {
    // var url = `https://scapree.herokuapp.com/api/room/${params.id}`
    var url = `http://localhost:3000/api/room/${params.id}`
    fetch(url)
      .then(response => response.json())
      .then(callback)
      .catch(error => { console.log(error) })
  }
  handleScroll (e) {
    let scroll = document.documentElement.scrollTop
    let selector = document.getElementById('sectionSelector')
    let sideBar = document.getElementById('fixedBar')

    if (scroll >= 60) {
      selector.className = 'sectionSelectorFixed'
      sideBar.className = 'fixedBarFixed'
    } else {
      selector.className = ''
      sideBar.className = ''
    }
  }
  componentDidMount () {
    const {params} = this.props.match
    if (!this.state.info) {
      Room.requestInitialData(info => {
        this.setState({...info})
      }, params)
    }
    window.addEventListener('scroll', this.handleScroll)
  }
  render () {
    return (
      <div id='roomDetail'>
        <div>
          <div id='sectionSelector'>Navigation Bar</div>
          <div id='mainSection'>Main Section</div>
          <div id='fixedBar'>Fixed bar</div>
          name: {this.state.name}<br />
          minAge: {this.state.minAge}<br />
          minPeople: {this.state.minPeople}<br />
          maxPeople: {this.state.maxPeople}<br />
        </div>
      </div>
    )
  }
}
