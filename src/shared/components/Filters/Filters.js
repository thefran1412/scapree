import React, {Component} from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import './Filters.css'

export default class extends Component {
  constructor () {
    super()
    this.state = {
      number: '',
      address: '',
      coords: []
    }
    this.update = this.update.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleAddressChange = this.handleAddressChange.bind(this)
    this.handleAddressSelect = this.handleAddressSelect.bind(this)
  }
  // handle form
  handleChange (e) {
    this.update([e.target.type], e.target.value)
  }
  handleSubmit (e) {
    if (e) e.preventDefault()
    if (this.state.coords.length) {
      this.props.updateState(this.state)
    }
  }
  // handle Adress
  handleAddressChange (address) {
    this.update('address', address)
    this.update('coords', [])
  }
  handleAddressSelect (address, placeId) {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        this.update('address', address)
        this.update('coords', [lat, lng])
      })
  }
  // update state
  update (key, value) {
    this.setState({
      [key]: value
    }, this.handleSubmit)
  }
  render () {
    const AutocompleteItem = ({ suggestion }) => (<div><i className='fa fa-map-marker' />{suggestion}</div>)
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
      onChange: this.handleAddressChange
    }
    return (
      <div id='headerForm'>
        <form>
          <PlacesAutocomplete
            inputProps={inputProps}
            autocompleteItem={AutocompleteItem}
            classNames={cssClasses}
            options={options}
            onSelect={this.handleAddressSelect}
          />
          <input type='number' onChange={this.handleChange} />
        </form>
        <script src='https://maps.googleapis.com/maps/api/js?key=AIzaSyClZ9K5b1v3scim5ZQ04SGJfQhMKCCCOB8&libraries=places' />
      </div>
    )
  }
}
