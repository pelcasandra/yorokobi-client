import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import agent from '@/store/modules/agent.js'
import backup from '@/store/modules/backup.js'
import payment_method from '@/store/modules/payment_method.js'
import stash from '@/store/modules/stash.js'
import user from '@/store/modules/user.js'
import workspace from '@/store/modules/workspace.js'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
Vue.use(VueAxios, axios)
Vue.axios.defaults.baseURL = '//localhost:3000'

export default new Vuex.Store({
  modules: { agent, backup, payment_method, stash, user, workspace },
  state: {},
  plugins: [createPersistedState({ paths: ['user'] })]
})
