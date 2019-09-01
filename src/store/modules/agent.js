import Vue from 'vue'
import AgentService from '@/services/AgentService'

export default {
  state: {
    agents: [],
    isLoading: true
  },

  mutations: {
    SET_AGENT(state, agent) {
      Vue.set(state.agents, agent.id, agent)
      state.isLoading = false
    }
  },

  actions: {
    fetchAgent({ commit }, id) {
      return AgentService.getAgent(id).then(response => {
        commit('SET_AGENT', response.data)
      })
    }
  },

  getters: {
    getAgent: state => id => {
      return state.agents[id]
    }
  }
}
