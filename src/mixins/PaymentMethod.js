export default {
  computed: {
    paymentMethod() {
      return this.$store.getters.getPaymentMethodByWorkspaceId(
        this.workspace.id
      )
    },
    paymentMethodIsLoaded() {
      return !this.$store.state.payment_method.isLoading
    }
  },
  watch: {
    workspace: {
      immediate: true,
      handler: 'fetchPaymentMethods'
    }
  },
  methods: {
    fetchPaymentMethods() {
      if (this.workspace && !this.paymentMethod) {
        this.$store.dispatch('fetchPaymentMethods')
      }
    }
  }
}
