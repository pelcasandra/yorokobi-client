import AgentService from '@/services/AgentService'

export default {
  state: {
    agents: [],
    isLoading: true
  },

  mutations: {
    SET_AGENT(state, agent) {
      state.agents.push(agent)
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
    getAgentById: state => id => {
      return state.agents.find(agent => agent.id === id)
    }
  }
}
