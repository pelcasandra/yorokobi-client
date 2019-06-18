import Vue from 'vue'

export default {
  state: {
    user: null,
    token: null,
    isNewUser: true
  },

  mutations: {
    SET_USER_DATA(state, userData) {
      // localStorage.setItem('user', JSON.stringify(userData.data))
      Vue.axios.defaults.headers.common['Authorization'] = userData.token
      state.token = userData.token
      state.user = userData.data
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
    register({ commit }, credentials) {
      return Vue.axios
        .post('/register', credentials)
        .then(({ data, headers }) => {
          commit('SET_USER_DATA', data, headers)
        })
    },
    login({ commit }, credentials) {
      return Vue.axios.post('login', credentials).then(({ data, headers }) => {
        commit('SET_USER_DATA', {
          data,
          token: headers.authorization
        })
      })
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
