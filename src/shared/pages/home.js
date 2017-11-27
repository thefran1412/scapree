import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
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
    const oldProps = JSON.stringify(this.props.filters)
    const newProps = JSON.stringify(nextProps.filters)

    if (newProps !== oldProps) {
      Home.requestInitialData(rooms => {
        this.setState({rooms})
      })
      console.log('update props')
    }
  }
  handleSubmit (data) {
    console.log(data)
    createCompany(data, response => {
      console.log('response', response)
    })
  }
  render () {
    // if (!this.props.logged) {
    //   return <Redirect to='/login' />
    // }
    return (
      <div>
        <h1>Home</h1>
        <CreateCompany submit={this.handleSubmit} />
        {
          (this.state.logged && !this.state.success)
          ? <CreateCompany submit={this.handleSubmit} />
          : (this.state.success)
            ? <PrintRooms rooms={this.state.rooms} />
            : <p>you shouldn't be here</p> // <Redirect to='/login' />
        }
      </div>
    )
  }
}
