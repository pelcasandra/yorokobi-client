<template>
  <div></div>
</template>

<script>
import NotFound from '@/views/errors/NotFound'

export default {
  props: ['handle', 'id'],
  created() {
    let path = {
      workspace: this.handle,
      stash: this.id
    }
    this.$store
      .dispatch('fetchBackupsByPath', path)
      .then(() => {
        this.$router.push({
          name: 'backup',
          params: {
            handle: this.handle,
            id: this.$store.getters.getBackupsByPath(path)[0].id
          }
        })
      })
      .catch(() => this.$_error(NotFound))
  }
}
</script>
