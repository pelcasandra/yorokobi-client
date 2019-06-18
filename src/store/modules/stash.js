import StashService from '@/services/StashService'

export default {
  state: {
    stashes: [],
    isLoading: true
  },

  mutations: {
    SET_STASHES(state, stashes) {
      state.stashes = stashes.stashes
      state.isLoading = false
    }
  },

  actions: {
    fetchStashes({ commit }, workspace_id) {
      StashService.getStashes(workspace_id).then(response => {
        commit('SET_STASHES', response.data)
      })
    },
    fetchStashesByWorkspaceHandle({ commit }, workspace_handle) {
      return StashService.getStashesByWorkspaceHandle(workspace_handle).then(
        response => {
          commit('SET_STASHES', response.data)
        }
      )
    }
  },

  getters: {
    getStashesByWorkspaceHandle: state => workspace => {
      return state.stashes.filter(stash => stash.workspace === workspace)
    }
  }
}
