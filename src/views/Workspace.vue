<template>
  <div class="flex flex-row bg-indigo-200 min-h-screen">
    <Nav :handle="handle" />
    <router-view />
  </div>
</template>

<script>
import Nav from '@/components/Nav'
import NotFound from '@/views/errors/NotFound'

export default {
  components: { Nav },
  props: ['handle'],
  created() {
    if (!this.$store.getters.getWorkspaceByHandle(this.handle)) {
      this.$store
        .dispatch('fetchWorkspace', this.handle)
        .then(() => this.$meta().refresh())
        .catch(() => this.$_error(NotFound))
    }
  }
}
</script>
