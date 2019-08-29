import Vue from 'vue'

export default {
  getPaymentMethods() {
    return Vue.axios.get('payment_methods')
  },
  postPaymentMethod(payment_method) {
    return Vue.axios.post('payment_methods', {
      workspace_id: payment_method.workspace_id,
      payment_method_token: payment_method.payment_method_token
    })
  }
}
