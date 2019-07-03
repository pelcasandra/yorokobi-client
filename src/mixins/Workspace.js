export default {
  computed: {
    currentWorkspace() {
      return this.$store.getters.getWorkspaceByHandle(this.handle)
    }
  }
}
