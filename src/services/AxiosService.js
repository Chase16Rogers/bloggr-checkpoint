import Axios from 'axios'

const baseURL = window.location.origin.includes('localhost') ? 'https://bcw-sandbox.herokuapp.com' : ''
export const api = Axios.create({
  baseURL,
  timeout: 8000
})

export const blogApi = Axios.create({
  baseURL: 'https://bcw-sandbox.herokuapp.com/api',
  timeout: 3000
})

export const setBearer = function(bearer) {
  api.defaults.headers.authorization = bearer
}

export const resetBearer = function() {
  api.defaults.headers.authorization = ''
}
