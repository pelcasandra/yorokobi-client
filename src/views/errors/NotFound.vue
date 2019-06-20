<template>
  <RequestError>
    <template v-slot:title
      >This page does not exist.</template
    >
    <template v-slot:description
      >You may have mistyped the address or the page may have moved</template
    >
  </RequestError>
</template>

<script>
import RequestError from '@/components/errors/RequestError'

export default {
  components: { RequestError }
}
</script>
