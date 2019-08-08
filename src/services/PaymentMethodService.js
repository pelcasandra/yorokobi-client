import Vue from 'vue'

export default {
  getPaymentMethods() {
    return Vue.axios.get('payment_methods')
  }
}
