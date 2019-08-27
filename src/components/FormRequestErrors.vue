<template>
  <div
    v-if="validLocally && anyError"
    id="remoteErrors"
    class="bg-red-100 rounded shadow-md font-medium text-red-600 text-sm border-red-500 mb-6"
  >
    <div v-if="singleError" class="p-5">{{ firstErrorMessage }}</div>
    <div v-else class="list-disc p-5">
      <div>Please check the following errors:</div>
      <ul class="list-disc ml-5 mt-4">
        <li v-for="(error, index) in errors" :key="index">
          <slot :error-message="error" :error="errors[index]">
            {{ error.message }}
          </slot>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'formRequestErrors',
  props: {
    errors: {
      type: Array
    },
    validator: {
      type: Object
    }
  },
  computed: {
    anyError() {
      return !!this.errors.length
    },
    firstErrorMessage() {
      return this.errors[0].message
    },
    validLocally() {
      return !this.validator.$invalid
    },
    singleError() {
      return this.errors.length === 1
    }
  }
}
</script>
