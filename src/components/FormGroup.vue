<template>
  <div class="p-6 border-b-2 block">
    <slot name="label">
      <label v-if="label" class="block text-gray-700 text-sm mb-2 font-bold">{{
        label
      }}</label>
    </slot>
    <slot />
    <div class="text-sm mt-2 font-medium text-red-600" v-if="hasErrors">
      <p>{{ firstErrorMessage }}</p>
    </div>
    <slot name="hint" v-if="hint">
      <div class="text-sm mt-3 text-gray-700">{{ hint }}</div>
    </slot>
  </div>
</template>

<script>
import { singleErrorExtractorMixin } from 'vuelidate-error-extractor'

export default {
  mixins: [singleErrorExtractorMixin],
  props: ['hint']
}
</script>
