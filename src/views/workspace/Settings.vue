<template>
  <div class="flex w-full">
    <NavSettings />
    <router-view :workspace="workspace" />
  </div>
</template>

<script>
import NavSettings from '@/components/NavSettings'
import Workspace from '@/mixins/Workspace.js'

export default {
  components: { NavSettings },
  mixins: [Workspace],
  props: ['handle']
}
</script>
z
