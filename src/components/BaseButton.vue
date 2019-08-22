<template>
  <button
    type="submit"
    name="button"
    class="text-white h-10 font-bold px-4 rounded flex content-center justify-center"
    :class="
      isLoading
        ? 'bg-indigo-400 w-32 cursor-auto'
        : 'bg-indigo-500 hover:bg-indigo-700 focus:shadow-outline focus:outline-none '
    "
    :disabled="isLoading"
  >
    <base-spinner v-if="isLoading" size="26px" color="white" class="flex" />
    <div v-else>
      <slot>Submit</slot>
    </div>
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    isLoading: { type: Boolean, default: false }
  }
}
</script>
