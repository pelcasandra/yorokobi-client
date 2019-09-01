<template>
  <div class="flex flex-row bg-indigo-200 min-h-screen" v-if="workspace">
    <Nav :handle="handle" />
    <router-view :workspace="workspace" />
  </div>
</template>

<script>
import Nav from '@/components/Nav'
import NotFound from '@/views/errors/NotFound'

export default {
  components: { Nav },
  props: ['handle', 'successMessage'],
  created() {
    if (!this.workspace) {
      this.$store
        .dispatch('fetchWorkspace', this.handle)
        .then(() => this.$meta().refresh())
        .catch(() => this.$_error(NotFound))
    }
  },
  computed: {
    workspace() {
      return this.$store.getters.getWorkspaceByHandle(this.handle)
    }
  }
}
</script>
