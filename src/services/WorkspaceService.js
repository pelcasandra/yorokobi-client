import Vue from 'vue'

export default {
  postWorkspace(workspace) {
    return Vue.axios.post('/workspaces', {
      name: workspace.name,
      handle: workspace.handle
    })
  },
  getWorkspaces() {
    return Vue.axios.get('/workspaces')
  },
  getWorkspace(id) {
    return Vue.axios.get('/workspaces/?handle=' + id)
  }
}
