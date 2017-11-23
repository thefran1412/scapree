import React, {Component} from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import './Filters.css'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      number: this.props.filters.people,
      address: this.props.filters.address,
      coords: this.props.filters.coords
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
    let newState = {
      filters: {
        people: +this.state.number,
        address: this.props.filters.address,
        coords: this.props.filters.coords
      }
    }
    if (this.state.coords.length) {
      newState.filters.coords = this.state.coords
      newState.filters.address = this.state.address
    }
    this.props.updateState(newState)
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
      onChange: this.handleAddressChange,
      placeholder: 'City, Zipcode or Address'
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
            googleLogo={false}
          />
          <input
            type='number'
            onChange={this.handleChange}
            b
          />
        </form>
        <script src='https://maps.googleapis.com/maps/api/js?key=AIzaSyClZ9K5b1v3scim5ZQ04SGJfQhMKCCCOB8&libraries=places' />
      </div>
    )
  }
}
