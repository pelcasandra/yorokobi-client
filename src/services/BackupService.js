import Vue from 'vue'

export default {
  getBackups(workspace_id) {
    return Vue.axios.get('backups/?workspace_id=' + workspace_id)
  },
  getBackupsByPath(path) {
    return Vue.axios.get('backups/?path=' + path)
  },
  getBackup(id) {
    return Vue.axios.get('backups/' + id)
  }
}
