<template>
  <button
    type="submit"
    name="button"
    class="text-white font-bold px-4 py-2 rounded content-center inline-flex justify-center transition-max-width"
    :class="
      loading || disabled
        ? `bg-${color}-400 cursor-auto`
        : `bg-${color}-500 hover:bg-${color}-700 focus:shadow-outline focus:outline-none`
    "
    :disabled="disabled || loading"
  >
    <div
      v-if="loading"
      class="flex-shrink-0 flex min-w-16 content-center justify-center"
    >
      <div class="mr-3" v-if="loadingText != ''">{{ loadingText }}</div>
      <base-spinner size="22px" color="white" class="flex" />
    </div>
    <div class="flex-shrink-0" v-else>
      <slot>Submit</slot>
    </div>
  </button>
</template>

<script>
import smoothReflow from 'vue-smooth-reflow'

export default {
  name: 'BaseButton',
  mixins: [smoothReflow],
  props: {
    color: { type: String, default: 'indigo' },
    disabled: { type: Boolean, default: false },
    loadingText: { type: String, default: 'Processing...' },
    loading: { type: Boolean, default: false }
  },
  mounted() {
    this.$smoothReflow({
      property: ['width'],
      transition: 'width .1s ease-out'
    })
  }
}
</script>
