import React, {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
// import PrintRooms from '../components/PrintRooms/PrintRooms'
import CreateCompany from '../components/CreateCompany/CreateCompany'
import {createCompany, getMyCompanie} from '../services/companies'
import CompanieProfile from '../components/CompanieProfile/CompanieProfile'

export default class Home extends Component {
  constructor (props) {
    super(props)

    this.state = {}

    this.handleSubmit = this.handleSubmit.bind(this)
    this.getData = this.getData.bind(this)
  }
  // static requestInitialData (callback, params, query) {
  //   getMyCompanie(callback)
  // }
  componentDidMount () {
    if (!this.state.rooms) {
      this.getData()
    }
    console.log('mounted', this.state)
  }
  // componentWillReceiveProps (nextProps) {
  //   console.log('recieved')
  //   this.getData()
  // }

  handleSubmit (data) {
    createCompany(data, data => {
      this.getData()
    })
  }
  getData () {
    getMyCompanie(response => {
      console.log('response', response)
      this.setState(response)
    })
  }
  render () {
    if (!this.props.logged) {
      return <Redirect to='/login' />
    }
    return (
      <div>
        {
          (this.state.logged && !this.state.success)
          ? <CreateCompany submit={this.handleSubmit} />
          : (this.state.success && this.state.rooms)
            ? <CompanieProfile data={this.state} from='home' />
            : <p>you shouldn't be here</p>
        }
      </div>
    )
  }
}
