import Vue from 'vue'

export default {
  getInvoices(workspace_id) {
    return Vue.axios.get('invoices/?workspace_id=' + workspace_id)
  },
  getInvoice(id) {
    return Vue.axios.get('invoices/' + id)
  }
}
