import axios from 'axios'

function login (username, password, func) {
  ajax({
    method: axios.post,
    url: 'http://localhost:3000/api/login',
    data: {username, password},
    func
  })
}

function logout (func) {
  ajax({
    method: axios.post,
    url: 'http://localhost:3000/api/logout',
    data: {},
    func
  })
}

function register (info, func) {
  ajax({
    method: axios.post,
    url: 'http://localhost:3000/api/register',
    data: info,
    func
  })
}

function checkToken (token, func) {
  ajax({
    method: axios.post,
    url: 'http://localhost:3000/api/check/token',
    data: {token},
    func
  })
}

function checkUsername (username, func) {
  ajax({
    method: axios.post,
    url: 'http://localhost:3000/api/check/username',
    data: {username},
    func
  })
}

function checkEmail (email, func) {
  ajax({
    method: axios.post,
    url: 'http://localhost:3000/api/check/email',
    data: {email},
    func
  })
}

function ajax (data) {
  data.method(data.url, data.data)
    .then(answer => {
      data.func(answer.data)
    })
    .catch(error => {
      console.log(error)
    })
}

export {login, checkToken, logout, register, checkUsername, checkEmail}
