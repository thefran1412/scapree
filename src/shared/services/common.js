function ajax (data) {
  data.method(data.url, data.data)
    .then(answer => {
      data.func(answer.data)
    })
    .catch(error => {
      console.log(error)
    })
}

function stateToObject (object) {
  let newObject = {}
  if (object.coords.length) {
    newObject.lat = object.coords[0]
    newObject.long = object.coords[1]
    newObject.address = object.address
  }
  if (object.address) {
    newObject.address = object.address
  }
  return newObject
}

function objectToQuery (object) {
  let array = []
  if (Object.keys(object).length === 0) return ''
  Object.keys(object).map((name, index) => {
    array.push(`${name}=${object[name]}`)
  })
  return '?' + array.join('&')
}

export {ajax, stateToObject, objectToQuery}
