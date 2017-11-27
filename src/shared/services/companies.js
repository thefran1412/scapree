import axios from 'axios'
import {ajax} from './common.js'

const baseUrl = 'http://localhost:3000'
// const baseUrl = 'https://scapree.herokuapp.com'

function createCompany (data, func) {
  ajax({
    method: axios.post,
    url: `${baseUrl}/api/companie`,
    data,
    func
  })
}

export {createCompany}
