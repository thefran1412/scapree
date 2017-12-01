import React, {Component} from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import './Filters.css'

export default class Filters extends Component {
  constructor (props) {
    super(props)
    this.state = {
      people: this.props.filters.people,
      address: this.props.filters.address,
      coords: this.props.filters.coords,
      order: this.props.filters.order,
      direction: this.props.filters.direction
    }
    this.update = this.update.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleAddressChange = this.handleAddressChange.bind(this)
    this.handleAddressSelect = this.handleAddressSelect.bind(this)
  }
  // handle form
  handleChange (e) {
    this.update({[e.target.name]: e.target.value}, this.handleSubmit)
  }
  handleSubmit (e) {
    if (e) e.preventDefault()
    let newState = {
      filters: {
        people: +this.state.people,
        address: this.state.address,
        coords: this.state.coords,
        order: this.state.order,
        direction: this.state.direction
      }
    }
    if (this.state.coords.length) {
      newState.filters.coords = this.state.coords
      newState.filters.address = this.state.address
    }
    // console.log('handle submit', this.state)
    this.props.updateState(newState)
  }
  // handle Adress
  handleAddressChange (address) {
    this.update({address, coords: []})
  }
  handleAddressSelect (address, placeId) {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        this.update({address, coords: [lat, lng]}, this.handleSubmit)
      })
  }
  // update state
  update (object, func) {
    func
    ? this.setState(object, func)
    : this.setState(object)
  }
  componentWillReceiveProps (nextProps) {
    const oldProps = JSON.stringify(this.props.filters)
    const newProps = JSON.stringify(nextProps.filters)

    if (newProps !== oldProps) {
      this.update(nextProps.filters)
    }
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
            name='people'
            value={this.state.people}
            onChange={this.handleChange}
            placeholder='People'
            id='people'
            min='0'
            max='20'
          />
        </form>
        <script src='https://maps.googleapis.com/maps/api/js?key=AIzaSyClZ9K5b1v3scim5ZQ04SGJfQhMKCCCOB8&libraries=places' />
      </div>
    )
  }
}
