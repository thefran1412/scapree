function ajax (data) {
  data.method(data.url, data.data)
    .then(answer => {
      data.func(answer.data)
    })
    .catch(error => {
      console.log(error)
    })
}

function objectToQuery (object) {
  let array = []
  Object.keys(object).map((name, index) => {
    array.push(`${name}=${object[name]}`)
  })
  return '?' + array.join('&')
}

export {ajax, objectToQuery}
