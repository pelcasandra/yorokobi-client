import Vue from 'vue'

export default {
  getStashes(workspace_id) {
    return Vue.axios.get('/stashes/?workspace_id=' + workspace_id)
  },
  getStashesByWorkspaceHandle(workspace_handle) {
    return Vue.axios.get('/stashes/?workspace_handle=' + workspace_handle)
  },
  getStash(id) {
    return Vue.axios.get('/stashes/' + id)
  }
}
