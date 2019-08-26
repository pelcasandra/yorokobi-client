<template>
  <div
    v-if="activeErrors.length"
    class="bg-red-100 shadow-md border-l-4 b-rounded mb-6 font-medium text-red-600 text-sm border-red-500"
  >
    <div v-if="singleError" class="p-5">{{ firstErrorMessage }}</div>
    <div v-else class="list-disc p-5">
      <div>Please check the following errors:</div>
      <ul class="list-disc ml-5 mt-4">
        <li v-for="(error, index) in activeErrorMessages" :key="index">
          <slot :error-message="error" :error="activeErrors[index]">
            {{ error }}
          </slot>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { multiErrorExtractorMixin } from 'vuelidate-error-extractor'

export default {
  name: 'baseMultiErrorExtractor',
  extends: multiErrorExtractorMixin,
  computed: {
    singleError() {
      return this.activeErrors.length <= 1
    }
  }
}
</script>
