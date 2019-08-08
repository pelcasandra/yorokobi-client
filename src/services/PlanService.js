import Vue from 'vue'

export default {
  getPlans() {
    return Vue.axios.get('plans')
  }
}
