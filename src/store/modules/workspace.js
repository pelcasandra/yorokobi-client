import WorkspaceService from '@/services/WorkspaceService'

export default {
  state: {
    alreadyFetched: false,
    isLoading: true,
    workspaces: []
  },

  mutations: {
    SET_WORKSPACE(state, workspace) {
      state.workspaces.push(workspace.workspaces[0])
      state.isLoading = false
    },
    SET_WORKSPACES(state, workspaces) {
      state.workspaces = workspaces.workspaces
      state.alreadyFetched = true
      state.isLoading = false
    }
  },

  actions: {
    fetchWorkspace({ commit }, workspace_handle) {
      return WorkspaceService.getWorkspace(workspace_handle).then(response => {
        commit('SET_WORKSPACE', response.data)
        if (!response.data.workspaces.length) {
          throw { code: 404 }
        }
      })
    },
    fetchWorkspaces({ commit }) {
      WorkspaceService.getWorkspaces().then(({ data }) => {
        commit('SET_WORKSPACES', data)
      })
    }
  },

  getters: {
    getWorkspaceByHandle: state => handle => {
      return state.workspaces.find(workspace => workspace.handle === handle)
    },
    getWorkspaceById: state => id => {
      return state.workspaces.find(workspace => workspace.id === id)
    }
  }
}
