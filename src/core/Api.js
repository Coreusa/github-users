import axios from 'axios'

// TODO: Add to env-config etc.
const API_BASE_URL = 'https://api.github.com'

const instance = axios.create({
  baseURL: API_BASE_URL
})

const users = {}

/**
* Retrieves all github users (limited to 30)
* @return {Promise} Axios promise
*/
users.getAll = () => {
  return instance.get('/users')
}

/**
* Retrieves a specific username
* @param {String} username - The unique name of the user to retrieve repos from
* @return {Promise} Axios promise
*/
users.get = (username) => {
  return instance.get(`/users/${username}`)
}

/**
* Retrieves all repos for a specific users (limited to 30)
* @param {String} username - The unique name of the user to retrieve repos from
* @return {Promise} Axios promise
*/
users.getRepos = (username) => {
  return instance.get(`/users/${username}/repos`)
}

/**
* Searches for users as identified by term (limited to 30)
* @param {String} term - The username to search for
* @return {Promise} Axios promise
*/
users.search = (term = null) => {
  if (term) {
    return instance.get(`/search/users?q=${term} in:name/`)
  }
}

export default {
  users
}
