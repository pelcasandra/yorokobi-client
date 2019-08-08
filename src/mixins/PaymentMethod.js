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
  }
}
