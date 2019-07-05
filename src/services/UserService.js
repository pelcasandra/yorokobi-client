import Vue from 'vue'

export default {
  postAuthenticationCredentials(credentials) {
    return Vue.axios.post('login', credentials)
  },
  postUser(user) {
    return Vue.axios.post('users', user)
  }
}
