import Vue from 'vue'

export default {
  getWorkspaces() {
    return Vue.axios.get('/workspaces')
  },
  getWorkspace(id) {
    return Vue.axios.get('/workspaces/?handle=' + id)
  }
}
