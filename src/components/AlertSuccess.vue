<template>
  <div
    v-if="message"
    v-html="message"
    class="bg-green-100 rounded shadow-md font-medium text-green-600 text-sm border-green-500 mb-6 p-5"
  >
    {{ message }}
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String
    }
  }
}
</script>
