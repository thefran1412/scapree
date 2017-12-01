import axios from 'axios'
import {ajax} from './common'

// const baseUrl = 'http://localhost:3000'
const baseUrl = 'https://scapree.herokuapp.com'

function uploadImage (data, func) {
  ajax({
    method: axios.post,
    url: `${baseUrl}/api/upload/`,
    data,
    func
  })
}

export {uploadImage}
