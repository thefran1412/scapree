import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {createRoom} from '../services/rooms'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

export default class AddRoom extends Component {
  constructor (props) {
    super(props)

    this.state = {
      name: '',
      desc: '',
      minAge: undefined,
      minPeople: undefined,
      maxPeople: undefined,
      duration: undefined,
      difficulty: undefined,
      price: undefined,
      address: '',
      coords: []
    }
    this.update = this.update.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleAddressChange = this.handleAddressChange.bind(this)
    this.handleAddressSelect = this.handleAddressSelect.bind(this)
  }
  handleSubmit (e) {
    e.preventDefault()
    console.log(this.state)
  }
  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
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
  render () {
    // if (!this.props.logged) {
    //   return <Redirect to='/login' />
    // }
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
      <div>
        <h1>Add Room</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type='text'
            onChange={this.handleChange}
            value={this.state.name}
            name='name'
            placeholder='Name'
            required
          />
          <textarea
            onChange={this.handleChange}
            value={this.state.desc}
            name='desc'
            placeholder='Description'
            required
          />
          <input
            type='number'
            onChange={this.handleChange}
            value={this.state.minAge}
            name='minAge'
            placeholder='Min. Age'
            min='1'
            required
          />
          <input
            type='number'
            onChange={this.handleChange}
            value={this.state.minPeople}
            name='minPeople'
            placeholder='Min. People'
            min='1'
            max='1000'
            required
          />
          <input
            type='number'
            onChange={this.handleChange}
            value={this.state.maxPeople}
            name='maxPeople'
            placeholder='Max. People'
            min={this.state.minPeople}
            max='1000'
            required
          />
          <input
            type='number'
            onChange={this.handleChange}
            value={this.state.duration}
            name='duration'
            placeholder='Duration'
            min='1'
            max='1000'
            required
          />
          <input
            type='number'
            onChange={this.handleChange}
            value={this.state.difficulty}
            name='difficulty'
            placeholder='Difficulty'
            max='100'
            min='0'
            required
          />
          <input
            type='number'
            onChange={this.handleChange}
            value={this.state.price}
            name='price'
            placeholder='Price'
            min='1'
            required
          />
          <PlacesAutocomplete
            inputProps={inputProps}
            autocompleteItem={AutocompleteItem}
            classNames={cssClasses}
            options={options}
            onSelect={this.handleAddressSelect}
            googleLogo={false}
          />
          <input
            type='submit'
            value='Create'
          />
        </form>
      </div>
    )
  }
}
