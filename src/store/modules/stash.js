import { normalize, schema } from 'normalizr'
import StashService from '@/services/StashService'
import filter from 'lodash/filter'

const stash = new schema.Entity('stashes')

export default {
  state: {
    stashes: [],
    isLoading: true
  },

  mutations: {
    SET_STASHES(state, data) {
      state.stashes = data.entities.stashes
      state.isLoading = false
    }
  },

  actions: {
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
    getStashes: state => workspace_id => {
      return filter(state.stashes, { workspace_id: workspace_id })
    }
  }
}
