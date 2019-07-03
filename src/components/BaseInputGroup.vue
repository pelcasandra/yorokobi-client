<template>
  <div class="flex flex-row">
    <span
      class="flex items-center bg-gray-200 rounded rounded-r-none px-3 font-medium text-gray-700"
      >{{ leftText }}</span
    >
    <slot />
  </div>
</template>

<script>
export default {
  props: { leftText: String }
}
</script>
