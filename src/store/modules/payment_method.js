import Vue from 'vue'
import find from 'lodash/find'
import { normalize, schema } from 'normalizr'
import PaymentMethodService from '@/services/PaymentMethodService'

const payment_method = new schema.Entity('payment_methods')

export default {
  state: {
    isLoading: true,
    payment_methods: {}
  },

  mutations: {
    SET_PAYMENT_METHOD(state, payment_method) {
      Vue.set(state.payment_methods, payment_method.id, payment_method)
      state.isLoading = false
    },
    SET_PAYMENT_METHODS(state, data) {
      state.payment_methods = data.entities.payment_methods
      state.isLoading = false
    }
  },

  actions: {
    fetchPaymentMethods({ commit }) {
      return PaymentMethodService.getPaymentMethods().then(({ data }) => {
        const payment_methods = normalize(data, {
          payment_methods: [payment_method]
        })
        commit('SET_PAYMENT_METHODS', payment_methods)
      })
    },
    updatePaymentMethod({ commit }, payment_method) {
      return PaymentMethodService.postPaymentMethod(payment_method).then(
        response => {
          commit('SET_PAYMENT_METHOD', response.data)
        }
      )
    }
  },

  getters: {
    getPaymentMethod: state => id => {
      return state.payment_methods[id]
    },
    getPaymentMethodByWorkspaceId: state => workspace_id => {
      return find(state.payment_methods, { workspace: workspace_id })
    }
  }
}
