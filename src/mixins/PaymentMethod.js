export default {
  computed: {
    paymentMethod() {
      return this.$store.getters.getPaymentMethodByWorkspaceId(
        this.workspace.id
      )
    }
  }
}
