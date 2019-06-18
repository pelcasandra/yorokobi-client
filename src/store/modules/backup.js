import BackupService from '@/services/BackupService'

export default {
  state: {
    backups: [],
    isLoading: true
  },

  mutations: {
    SET_BACKUP(state, backup) {
      state.backups.push(backup)
      state.isLoading = false
    },
    SET_BACKUPS(state, backups) {
      state.backups = backups.backups
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
      return BackupService.getBackupsByPath(path.workspace, path.stash).then(
        response => {
          commit('SET_BACKUPS', response.data)
        }
      )
    }
  },

  getters: {
    getBackupById: state => id => {
      return state.backups.find(backup => backup.id === id)
    },
    getBackupsByPath: state => path => {
      return state.backups.filter(
        backup =>
          backup.workspace === path.workspace && backup.stash == path.stash
      )
    }
  }
}
