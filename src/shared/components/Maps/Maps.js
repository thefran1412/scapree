import GoogleMapReact from 'google-map-react'
import React, {Component} from 'react'
import './Maps.css'

const AnyReactComponent = ({ text }) => <div className='pointer'><img src={'/static/media/pin.png'} width='30' /></div>

export default class Maps extends Component {
  componentWillMount () {
    this.setState(this.props)
  }
  componentWillReceiveProps (newProps) {
    console.log(newProps)
    this.setState(newProps)
  }
  render () {
    return (
      <div id='maps'>
        <a href={`https://www.google.com/maps/place/${this.props.address}`} target='_blank' className='mapAddress'>{this.props.address}</a>
        <div className='onlyMap'>
          <GoogleMapReact apiKey={'AIzaSyClZ9K5b1v3scim5ZQ04SGJfQhMKCCCOB8'} center={[this.props.coords[1], this.props.coords[0]]} defaultZoom={15}>
            <AnyReactComponent
              lat={this.state.coords[1]}
              lng={this.state.coords[0]}
              text={'Kreyser Avrora'}
            />
          </GoogleMapReact>
        </div>
      </div>
    )
  }
}
