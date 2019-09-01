import Vue from 'vue'
import find from 'lodash/find'
import { normalize, schema } from 'normalizr'
import SubscriptionService from '@/services/SubscriptionService'
import WorkspaceService from '@/services/WorkspaceService'

const workspace = new schema.Entity('workspaces')

export default {
  state: {
    isLoading: true,
    workspaces: {}
  },

  mutations: {
    SET_WORKSPACE(state, workspace) {
      Vue.set(state.workspaces, workspace.id, workspace)
      state.isLoading = false
    },
    SET_WORKSPACES(state, data) {
      state.workspaces = data.entities.workspaces
      state.isLoading = false
    }
  },

  actions: {
    fetchWorkspaces({ commit }) {
      return WorkspaceService.getWorkspaces().then(({ data }) => {
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
    },
    cancelWorkspaceSubscription({ commit }, workspace_id) {
      return SubscriptionService.deleteSubscription(workspace_id).then(
        response => {
          commit('SET_WORKSPACE', response.data)
        }
      )
    },
    updateWorkspaceSubscription({ commit }, workspace) {
      return SubscriptionService.postSubscription(workspace).then(response => {
        commit('SET_WORKSPACE', response.data)
      })
    }
  },

  getters: {
    getWorkspace: state => id => {
      return state.workspaces[id]
    },
    getWorkspaceByHandle: state => handle => {
      return find(state.workspaces, { handle: handle })
    }
  }
}
