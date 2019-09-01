<template>
  <div></div>
</template>

<script>
import NotFound from '@/views/errors/NotFound'

export default {
  props: ['handle', 'id'],
  computed: {
    lastBackup() {
      return this.$store.getters.getBackupsByPath(this.path)[0]
    },
    path() {
      return this.handle + '/' + this.id
    }
  },
  mounted() {
    this.fetchBackups()
  },
  methods: {
    fetchBackups() {
      this.$store
        .dispatch('fetchBackupsByPath', this.path)
        .then(() => {
          this.$router.push({
            name: 'backup',
            params: {
              id: this.lastBackup.id
            }
          })
        })
        .catch(() => this.$_error(NotFound))
    }
  }
}
</script>
