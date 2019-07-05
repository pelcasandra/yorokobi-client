import Vue from 'vue'

export default {
  getAgents(workspace_id) {
    return Vue.axios.get('agents/?workspace_id=' + workspace_id)
  },
  getAgent(id) {
    return Vue.axios.get('agents/' + id)
  }
}
