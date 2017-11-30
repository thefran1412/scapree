import React, {Component} from 'react'
import {getCompanie} from '../services/companies'
import './companie.css'
import CompanieProfile from '../components/CompanieProfile/CompanieProfile'

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
    this.state = initialData
    if (initialData && initialData.name) {
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

    if (!this.state.name) {
      Companie.requestInitialData(response => {
        if (response.name) {
          this.setState(response)
        }
      }, params)
    }
  }
  render () {
    return (
      <div>
        {
          this.state.rooms
          ? <CompanieProfile data={this.state} from='companie' />
          : 'Loading...'
        }
      </div>
    )
  }
}
