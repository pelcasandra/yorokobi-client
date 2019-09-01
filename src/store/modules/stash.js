import Vue from 'vue'
import filter from 'lodash/filter'
import { normalize, schema } from 'normalizr'
import StashService from '@/services/StashService'

const stash = new schema.Entity('stashes')

export default {
  state: {
    stashes: [],
    isLoading: true
  },

  mutations: {
    SET_STASH(state, stash) {
      Vue.set(state.stashes, stash.id, stash)
      state.isLoading = false
    },
    SET_STASHES(state, data) {
      state.stashes = data.entities.stashes
      state.isLoading = false
    }
  },

  actions: {
    fetchStash({ commit }, id) {
      return StashService.getStash(id).then(response => {
        commit('SET_STASH', response.data)
      })
    },
    fetchStashes({ commit }, workspace_id) {
      return StashService.getStashes(workspace_id).then(({ data }) => {
        const stashes = normalize(data, {
          stashes: [stash]
        })

        commit('SET_STASHES', stashes)
      })
    }
  },

  getters: {
    getStash: state => id => {
      return state.stashes[id]
    },
    getStashes: state => workspace_id => {
      return filter(state.stashes, { workspace: workspace_id })
    }
  }
}
