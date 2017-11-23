import React, {Component} from 'react'
import {initAutocomplete} from '../../services/location.js'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import './Filters.css'

export default class extends Component {
  constructor () {
    super()
    this.state = {
      text: '',
      number: '',
      date: '',
      address: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleAddressChange = this.handleAddressChange.bind(this)
  }
  handleChange (e) {
    this.setState({
      [e.target.type]: e.target.value
    })
  }
  handleAddressChange (address) {
    this.setState({address})
  }
  handleAddressSelect (info) {
    // console.log(info)
    geocodeByAddress('Tokyo, Japan')
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => console.log('Successfully got latitude and longitude', { lat, lng }))
  }
  handleSubmit (e) {
    e.preventDefault()
    console.log(this.state)
  }
  initAutocomplete () {
    console.log('executed')
  }
  render () {
    const AutocompleteItem = ({ formattedSuggestion }) => (
      <div>
        <strong>{ formattedSuggestion.mainText }</strong>{' '}
        <small>{ formattedSuggestion.secondaryText }</small>
      </div>
    )
    const cssClasses = {
      root: 'autocompleteRoot',
      input: 'autocompleteInput',
      autocompleteContainer: 'autocompleteContainer'
    }
    const options = {
      country: ['es']
    }
    const inputProps = {
      value: this.state.address,
      onChange: this.handleAddressChange,
      onSelect: this.handleAddressSelect
    }
    return (
      <div id='headerForm'>
        <form onSubmit={this.handleSubmit}>
          <PlacesAutocomplete
            inputProps={inputProps}
            autocompleteItem={AutocompleteItem}
            classNames={cssClasses}
            options={options}
          />
          <input type='number' onChange={this.handleChange} />
          <input type='date' onChange={this.handleChange} />
          <input type='submit' value='search' />
        </form>
        <script src='https://maps.googleapis.com/maps/api/js?key=AIzaSyClZ9K5b1v3scim5ZQ04SGJfQhMKCCCOB8&libraries=places' />
      </div>
    )
  }
}
