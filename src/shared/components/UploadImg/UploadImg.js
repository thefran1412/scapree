import {uploadImage} from '../../services/images'
import React, {Component} from 'react'
import './UploadImg.css'

export default class UploadImg extends Component {
  constructor (props) {
    super(props)

    this.state = {
      image: 'default.png',
      preview: this.props.preview
    }
    this.handleFileChange = this.handleFileChange.bind(this)
  }
  componentDidMount () {
  }
  handleFileChange () {
    const data = new FormData()
    data.append('image', document.getElementById('image').files[0])

    uploadImage(data, response => {
      console.log(response)
      if (response.success) {
        this.setState({
          image: response.msg
        })
        this.props.onChange(response.msg)
      }
    })
  }
  render () {
    const img = `/static/uploads/${this.state.image}`

    return (
      <div id='uploadImg'>
        <input
          type='file'
          name='image'
          id='image'
          accept='image/x-png,image/gif,image/jpeg'
          onChange={this.handleFileChange}
        />
        <div style={{backgroundImage: `url(/static/uploads/${this.state.image})`}} className={this.state.preview + 'Preview'} />
      </div>
    )
  }
}
