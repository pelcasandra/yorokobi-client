<template>
  <div class="flex w-full">
    <NavSettings />
    <router-view :workspace="workspace" />
  </div>
</template>

<script>
import NavSettings from '@/components/NavSettings'

export default {
  components: { NavSettings },
  props: ['workspace']
}
</script>
