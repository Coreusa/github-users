import axios from 'axios'

const API_BASE_URL = 'https://api.github.com'

const instance = axios.create({
  baseURL: API_BASE_URL
})

const users = {}

users.getAll = () => {
  return instance.get('/users')
}

users.get = (username) => {
  return instance.get(`/users/${username}`)
}

users.getRepos = (username) => {
  return instance.get(`/users/${username}/repos`)
}

users.search = (term = null) => {
  if (term) {
    return instance.get(`/users/${term}`)
  }
}

export default {
  users
}
