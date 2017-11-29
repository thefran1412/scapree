import axios from 'axios'
import {ajax, objectToQuery} from './common'

const baseUrl = 'http://localhost:3000'
// const baseUrl = 'https://scapree.herokuapp.com'

function getRooms (data, func) {
  ajax({
    method: axios.get,
    url: `${baseUrl}/api/rooms/` + objectToQuery(data),
    func
  })
}

function getMyRooms (func) {
  ajax({
    method: axios.get,
    url: `${baseUrl}/api/myrooms`,
    func
  })
}

function addRoom (data, func) {
  ajax({
    method: axios.post,
    url: `${baseUrl}/api/room`,
    data,
    func
  })
}

export {getRooms, getMyRooms, addRoom}
