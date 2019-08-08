export default {
  computed: {
    workspace() {
      return this.$store.getters.getWorkspaceByHandle(this.handle)
    }
  }
}
