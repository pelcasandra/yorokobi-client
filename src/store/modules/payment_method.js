import find from 'lodash/find'
import { normalize, schema } from 'normalizr'
import PaymentMethodService from '@/services/PaymentMethodService'

const payment_method = new schema.Entity('payment_methods')

export default {
  state: {
    alreadyFetched: false,
    isLoading: true,
    payment_methods: {}
  },

  mutations: {
    SET_PAYMENT_METHODS(state, data) {
      state.payment_methods = data.entities.payment_methods
      state.alreadyFetched = true
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
    }
  },

  getters: {
    getPaymentMethod: state => id => {
      return state.payment_methods[id]
    },
    getPaymentMethodByWorkspaceId: state => workspace_id => {
      return find(state.payment_methods, { workspace_id: workspace_id })
    }
  }
}
