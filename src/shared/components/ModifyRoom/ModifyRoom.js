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
    const inputProps = {
      value: this.state.location.address,
      onChange: this.handleAddressChange,
      placeholder: 'City, Zipcode or Address',
      required: true
    }
    return (
      <div id='roomForm'>
        <h1>Sala</h1>
        <form onSubmit={this.handleSubmit} >
          <p>Nombre</p>
          <input
            type='text'
            onChange={this.handleChange}
            value={this.state.name}
            name='name'
            required
          />
          <p>Descripción</p>
          <textarea
            onChange={this.handleChange}
            value={this.state.desc}
            name='desc'
            required
          />
          <div>
            <p>Edad Mínima</p>
            <input
              type='number'
              onChange={this.handleChange}
              value={this.state.minAge}
              name='minAge'
              min='1'
              required
            />
          </div>
          <div className='roomFormRight'>
            <p>Duración</p>
            <input
              type='number'
              onChange={this.handleChange}
              value={this.state.duration}
              name='duration'
              min='1'
              max='1000'
              required
            />
          </div>
          <div>
            <p>Min. Personas</p>
            <input
              type='number'
              onChange={this.handleChange}
              value={this.state.minPeople}
              name='minPeople'
              min='1'
              max='1000'
              required
            />
          </div>
          <div className='roomFormRight'>
            <p>Max. Personas</p>
            <input
              type='number'
              onChange={this.handleChange}
              value={this.state.maxPeople}
              name='maxPeople'
              min={this.state.minPeople}
              max='1000'
              required
            />
          </div>
          <div>
            <p>Dificultad 0 - 100</p>
            <input
              type='number'
              onChange={this.handleChange}
              value={this.state.difficulty}
              name='difficulty'
              max='100'
              min='0'
              required
            />
          </div>
          <div className='roomFormRight'>
            <p>Precio</p>
            <input
              type='number'
              onChange={this.handleChange}
              value={this.state.price}
              name='price'
              min='1'
              required
            />
          </div>
          <p>Reserva</p>
          <input
            type='url'
            onChange={this.handleChange}
            value={this.state.reservation}
            name='reservation'
            required
          />
          <p>Ubicación</p>
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
          <div className='buttons'>
            <input
              type='submit'
              value='Envia'
              className='roomSubmit'
              style={{backgroundColor: '#7ca949'}}
            />
            {
              (this.props.delete)
              ? <button onClick={this.props.delete} className='roomSubmit' style={{backgroundColor: '#c34a4a'}}>Borrar</button>
              : ''
            }
          </div>
        </form>
      </div>
    )
  }
}
