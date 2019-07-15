<template>
  <clip-loader :color="color"></clip-loader>
</template>

<script>
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'

export default {
  components: { ClipLoader },
  data() {
    return {
      color: '#667EEA'
    }
  }
}
</script>
