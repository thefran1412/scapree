import axios from 'axios'
import {ajax, objectToQuery} from './common.js'

function getRooms (data, func) {
  ajax({
    method: axios.get,
    url: 'http://localhost:3000/api/rooms' + objectToQuery(data),
    func
  })
}

export {getRooms}

// var url = 'https://floating-ravine-77277.herokuapp.com/api/rooms'
