import React, {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import PrintRooms from '../components/PrintRooms/PrintRooms'
import CreateCompany from '../components/CreateCompany/CreateCompany'
import {getMyRooms} from '../services/rooms'
import {createCompany} from '../services/companies'

export default class Home extends Component {
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
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  static requestInitialData (callback, params, query) {
    getMyRooms(callback)
  }
  componentDidMount () {
    if (!this.state.rooms) {
      Home.requestInitialData(data => {
        console.log(data)
        this.setState({...data})
      })
    }
  }
  componentWillReceiveProps (nextProps) {
    Home.requestInitialData(rooms => {
      this.setState({rooms})
    })
  }
  handleSubmit (data) {
    createCompany(data, response => {
      console.log('response', response)
      Home.requestInitialData(rooms => {
        this.setState({rooms})
      })
    })
  }
  render () {
    if (!this.props.logged) {
      return <Redirect to='/login' />
    }
    return (
      <div>
        <h1>Home</h1>
        {
          (this.state.logged && !this.state.success)
          ? <CreateCompany submit={this.handleSubmit} />
          : (this.state.success)
            ? (<div>
              <PrintRooms rooms={this.state.rooms} />
              <Link to='/addroom'>Add Room</Link>
            </div>)
            : <p>you shouldn't be here</p> // <Redirect to='/login' />
        }
      </div>
    )
  }
}
