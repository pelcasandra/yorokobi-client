import Vue from 'vue'
import filter from 'lodash/filter'
import { normalize, schema } from 'normalizr'
import InvoiceService from '@/services/InvoiceService'

const invoice = new schema.Entity('invoices')

export default {
  state: {
    invoices: [],
    isLoading: true
  },

  mutations: {
    SET_INVOICE(state, invoice) {
      Vue.set(state.invoices, invoice.id, invoice)
      state.isLoading = false
    },
    SET_INVOICES(state, data) {
      state.invoices = data.entities.invoices
      state.isLoading = false
    }
  },

  actions: {
    fetchInvoice({ commit }, id) {
      return InvoiceService.getInvoice(id).then(response => {
        commit('SET_INVOICE', response.data)
      })
    },
    fetchInvoices({ commit }, workspace_id) {
      return InvoiceService.getInvoices(workspace_id).then(({ data }) => {
        const invoices = normalize(data, {
          invoices: [invoice]
        })
        commit('SET_INVOICES', invoices)
      })
    }
  },

  getters: {
    getInvoice: state => id => {
      return state.invoices[id]
    },
    getInvoices: state => workspace_id => {
      return filter(state.invoices, { workspace: workspace_id })
    }
  }
}
