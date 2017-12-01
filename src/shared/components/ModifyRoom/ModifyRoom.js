import React, {Component} from 'react'
import UploadImg from '../UploadImg/UploadImg'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import './ModifyRoom.css'

export default class ModifyRoom extends Component {
  constructor (props) {
    super(props)

    this.state = {...this.props.data}

    this.update = this.update.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleFileChange = this.handleFileChange.bind(this)
    this.handleAddressChange = this.handleAddressChange.bind(this)
    this.handleAddressSelect = this.handleAddressSelect.bind(this)
  }
  handleSubmit (e) {
    if (e) e.preventDefault()
    this.props.submit(this.state)
  }
  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleAddressChange (address) {
    this.update({location: {address, coordinates: []}})
  }
  handleAddressSelect (address, placeId) {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        this.update({location: {address, coordinates: [lat, lng]}})
      })
  }
  update (object, func) {
    func
    ? this.setState(object, func)
    : this.setState(object)
  }
  handleFileChange (imgName) {
    this.setState({profileImg: imgName})
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
    console.log(this.state)
    const inputProps = {
      value: this.state.location.address,
      onChange: this.handleAddressChange,
      placeholder: 'City, Zipcode or Address',
      required: true
    }
    return (
      <div>
        <form onSubmit={this.handleSubmit} id='uploadForm'>
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
          <input
            type='url'
            onChange={this.handleChange}
            value={this.state.reservation}
            name='reservation'
            placeholder='Url de Reserva'
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
          <UploadImg
            onChange={this.handleFileChange}
            img={this.state.profileImg}
            preview='poster'
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
