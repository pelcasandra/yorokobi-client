import Vue from 'vue'

export default {
  getBackups(workspace_id) {
    return Vue.axios.get('/backups/?workspace_id=' + workspace_id)
  },
  getBackupsByPath(workspace_id, stash_id) {
    return Vue.axios.get('/backups/?path=' + workspace_id + '/' + stash_id)
  },
  getBackup(id) {
    return Vue.axios.get('/backups/' + id)
  }
}
