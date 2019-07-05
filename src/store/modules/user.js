import Vue from 'vue'
import UserService from '@/services/UserService'

export default {
  state: {
    user: null,
    token: null,
    isNewUser: true
  },

  mutations: {
    SET_USER_DATA(state, data) {
      Vue.axios.defaults.headers.common['Authorization'] = data.token
      state.token = data.token
      state.user = data.user
    },
    LOGOUT(rootState) {
      rootState.user = null
      rootState.token = null
      location.reload()
    },
    IS_NEW_USER(state, isNewUser) {
      state.isNewUser = isNewUser
    }
  },

  actions: {
    register({ commit }, user) {
      return UserService.postUser(user).then(response => {
        commit('SET_USER_DATA', {
          user: response.data,
          token: response.headers.authorization
        })
      })
    },
    login({ commit }, credentials) {
      return UserService.postAuthenticationCredentials(credentials).then(
        response => {
          commit('SET_USER_DATA', {
            user: response.data,
            token: response.headers.authorization
          })
        }
      )
    },
    logout({ commit }) {
      commit('LOGOUT')
    },
    isNewUser({ commit }, isNewUser) {
      commit('IS_NEW_USER', isNewUser)
    }
  },

  getters: {
    loggedIn(state) {
      return !!state.user
    }
  }
}
