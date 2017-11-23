import axios from 'axios'
import {ajax} from './common.js'

function getCoordsInfo (coords, func) {
  ajax({
    method: axios.post,
    url: `http://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}`,
    func: response => {
      const city = response.results.filter(location => {
        const types = JSON.stringify(location.types)
        const rightTypes = JSON.stringify(['locality', 'political'])
        return (types === rightTypes)
      })
      func(city[0])
    }
  })
}

export {getCoordsInfo}
