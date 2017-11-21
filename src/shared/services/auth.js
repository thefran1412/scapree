import axios from 'axios'

function login (username, password, func) {
  axios.post('http://localhost:3000/api/login', {
    username: username,
    password: password
  })
    .then(answer => {
      func(answer.data)
    })
    .catch(error => {
      console.log(error)
    })
}

function logout (func) {
  axios.post('http://localhost:3000/api/logout')
    .then(answer => {
      func(answer.data)
    })
    .catch(error => {
      console.log(error)
    })
}

function checkToken (token, func) {
  axios.post('http://localhost:3000/api/check', {
    token: token
  })
    .then(answer => {
      func(answer.data)
    })
    .catch(error => {
      console.log(error)
    })
}

export {login, checkToken, logout}
