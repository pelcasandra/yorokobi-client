<template>
  <div class="text-gray-600 text-sm mt-1">
    <slot></slot>
    <span>&nbsp;</span>
    <timeago :datetime="datetime" :auto-update="60" locale="en"></timeago>.
  </div>
</template>

<script>
export default {
  props: ['date', 'datetime']
}
</script>
