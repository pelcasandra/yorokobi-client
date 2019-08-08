<template>
  <div class="flex w-full">
    <NavSettings />
    <router-view />
  </div>
</template>

<script>
import NavSettings from '@/components/NavSettings'

export default {
  components: { NavSettings },
  props: ['handle']
}
</script>
z
