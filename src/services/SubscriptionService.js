import Vue from 'vue'

export default {
  deleteSubscription(workspace_id) {
    return Vue.axios.delete('workspaces/' + workspace_id + '/subscription')
  },
  postSubscription(workspace) {
    return Vue.axios.post('workspaces/' + workspace.id + '/subscription', {
      plan_name: workspace.plan_name,
      payment_method_token: workspace.payment_method_token
    })
  }
}
