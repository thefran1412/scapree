import React, {Component} from 'react'
import {getCompanie, editCompanie} from '../services/companies'
// import {Link} from 'react-router-dom'
import CreateCompany from '../components/CreateCompany/CreateCompany'

export default class EditCompanie extends Component {
  constructor (props) {
    super(props)

    let initialData
    if (__isBrowser__) {
      initialData = window.__initialData__
      delete window.__initialData__
    } else {
      initialData = props.staticContext.initialData
    }
    this.state = {...initialData}

    this.handleSubmit = this.handleSubmit.bind(this)
  }
  static requestInitialData (callback, params, query) {
    getCompanie(params.id, callback)
  }
  componentDidMount () {
    document.documentElement.scrollTop = 0
    const {params} = this.props.match

    if (!this.state.name) {
      EditCompanie.requestInitialData(response => {
        if (response.name) {
          this.setState(response)
        }
      }, params)
    }
  }
  handleSubmit (data) {
    data.id = this.state._id
    data.user = this.state.user

    console.log(data)
    editCompanie(data, response => {
      if (response.success) {
        this.props.history.push('/home')
      } else {
        console.log(response)
      }
    })
  }
  render () {
    return (
      <div id='editCompanie'>
        <p>Edit companie</p>
        {
          this.state.rooms
          ? <CreateCompany
            submit={this.handleSubmit}
            data={this.state}
          />
          : 'Loading...'
        }
      </div>
    )
  }
}
