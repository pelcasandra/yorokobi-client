import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['getWorkspaceByHandle']),
    currentWorkspace() {
      return this.$store.getters.getWorkspaceByHandle(this.handle)
    }
  }
}
