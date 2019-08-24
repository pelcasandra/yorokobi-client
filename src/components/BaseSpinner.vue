<template>
  <clip-loader :color="color" :size="size"></clip-loader>
</template>

<script>
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'

export default {
  components: { ClipLoader },
  props: {
    color: {
      type: String,
      default: '#667EEA'
    },
    size: {
      type: String,
      default: '35px'
    }
  }
}
</script>
