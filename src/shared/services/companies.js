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

function getCompanie (id, func) {
  ajax({
    method: axios.get,
    url: `${baseUrl}/api/companie/${id}`,
    func: response => {
      func(orderData(response, false))
    }
  })
}

function getMyCompanie (func) {
  ajax({
    method: axios.get,
    url: `${baseUrl}/api/mycompanie`,
    func: response => {
      func(orderData(response, true))
    }
  })
}

function orderData (response, mine) {
  if (response.data) {
    const obj = {
      ...response.data.companie,
      rooms: response.data.rooms
    }
    if (mine) {
      obj.success = response.success
      obj.logged = response.logged
      obj.companie = response.companie
    }
    return obj
  }
  return response
}
export {createCompany, getCompanie, getMyCompanie}
