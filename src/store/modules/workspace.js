import WorkspaceService from '@/services/WorkspaceService'
import { normalize, schema } from 'normalizr'
import Vue from 'vue'

const workspace = new schema.Entity('workspaces')

export default {
  state: {
    alreadyFetched: false,
    isLoading: true,
    workspaces: {}
  },

  mutations: {
    SET_WORKSPACE(state, workspace) {
      state.workspaces[workspace.id] = workspace
      state.isLoading = false
    },
    SET_WORKSPACES(state, data) {
      state.workspaces = data.entities.workspaces
      state.alreadyFetched = true
      state.isLoading = false
    }
  },

  actions: {
    fetchWorkspaces({ commit }) {
      WorkspaceService.getWorkspaces().then(({ data }) => {
        const workspaces = normalize(data, { workspaces: [workspace] })
        commit('SET_WORKSPACES', workspaces)
      })
    },
    fetchWorkspace({ commit, state }, workspace_handle) {
      return WorkspaceService.getWorkspace(workspace_handle).then(response => {
        const workspace = response.data.workspaces[0]
        if (workspace && !state.workspaces[workspace.id]) {
          commit('SET_WORKSPACE', workspace)
        }
        if (!response.data.workspaces.length) {
          throw { code: 404 }
        }
      })
    },
    createWorkspace({ commit }, workspace) {
      return WorkspaceService.postWorkspace(workspace).then(response => {
        commit('SET_WORKSPACE', response.data)
      })
    },
    updateWorkspace({ commit }, workspace) {
      return WorkspaceService.putWorkspace(workspace).then(response => {
        commit('SET_WORKSPACE', response.data)
      })
    }
  },

  getters: {
    getWorkspace: state => id => {
      return state.workspaces[id]
    },
    getWorkspaceByHandle: state => handle => {
      return Vue._.find(state.workspaces, { handle: handle })
    }
  }
}
