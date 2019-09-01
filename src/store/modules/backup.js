import Vue from 'vue'
import filter from 'lodash/filter'
import { normalize, schema } from 'normalizr'
import BackupService from '@/services/BackupService'

const backup = new schema.Entity('backups')

export default {
  state: {
    backups: [],
    isLoading: true
  },

  mutations: {
    SET_BACKUP(state, backup) {
      Vue.set(state.backups, backup.id, backup)
      state.isLoading = false
    },
    SET_BACKUPS(state, data) {
      state.backups = data.entities.backups
      state.isLoading = false
    }
  },

  actions: {
    fetchBackup({ commit }, id) {
      return BackupService.getBackup(id).then(response => {
        commit('SET_BACKUP', response.data)
      })
    },
    fetchBackupsByPath({ commit }, path) {
      return BackupService.getBackupsByPath(path).then(({ data }) => {
        const backups = normalize(data, {
          backups: [backup]
        })
        commit('SET_BACKUPS', backups)
        if (!data.backups.length) {
          throw { code: 404 }
        }
      })
    }
  },

  getters: {
    getBackup: state => id => {
      return state.backups[id]
    },
    getBackupsByPath: state => path => {
      return filter(state.backups, {
        path: path
      })
    }
  }
}
