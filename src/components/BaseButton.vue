<template>
  <button
    type="submit"
    name="button"
    class="text-white h-10 font-bold px-4 rounded content-center flex justify-center transition-max-width"
    :class="
      isLoading
        ? 'bg-indigo-400 cursor-auto'
        : 'bg-indigo-500 hover:bg-indigo-700 focus:shadow-outline focus:outline-none '
    "
    :disabled="isLoading"
  >
    <div v-if="isLoading" class="flex-shrink-0 flex min-w-16 content-center justify-center">
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
    loadingText: { type: String, default: 'Processing...' },
    isLoading: { type: Boolean, default: false }
  },
  mounted() {
    this.$smoothReflow({
      property: ['width'],
      transition: 'width .1s ease-out'
    })
  }
}
</script>
