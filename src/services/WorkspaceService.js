import Vue from 'vue'

export default {
  getWorkspaces() {
    return Vue.axios.get('/workspaces')
  },
  getWorkspace(id) {
    return Vue.axios.get('/workspaces/?handle=' + id)
  },
  postWorkspace(workspace) {
    return Vue.axios.post('/workspaces', {
      name: workspace.name,
      handle: workspace.handle
    })
  },
  putWorkspace(workspace) {
    return Vue.axios.put('/workspaces/' + workspace.id, {
      name: workspace.name,
      handle: workspace.handle
    })
  }
}
