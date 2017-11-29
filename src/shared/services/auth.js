import axios from 'axios'
import {ajax} from './common.js'

const baseUrl = 'http://localhost:3000'
// const baseUrl = 'https://scapree.herokuapp.com'

function login (username, password, func) {
  ajax({
    method: axios.post,
    url: `${baseUrl}/api/login`,
    data: {username, password},
    func
  })
}

function logout (func) {
  ajax({
    method: axios.post,
    url: `${baseUrl}/api/logout`,
    data: {},
    func
  })
}

function register (info, func) {
  ajax({
    method: axios.post,
    url: `${baseUrl}/api/register`,
    data: info,
    func
  })
}

function checkToken (token, func) {
  ajax({
    method: axios.post,
    url: `${baseUrl}/api/check/token`,
    data: {token},
    func
  })
}

function checkUsername (username, func) {
  ajax({
    method: axios.post,
    url: `${baseUrl}/api/check/username`,
    data: {username},
    func
  })
}

function checkEmail (email, func) {
  ajax({
    method: axios.post,
    url: `${baseUrl}/api/check/email`,
    data: {email},
    func
  })
}

export {login, checkToken, logout, register, checkUsername, checkEmail}
