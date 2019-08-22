import Vue from 'vue'

export default {
  postSubscription(workspace) {
    return Vue.axios.post('workspaces/' + workspace.id + '/subscription', {
      plan_name: workspace.plan_name,
      payment_method_token: workspace.payment_method_token
    })
  }
}
