<template>
  <div class="bg-white pt-4 pb-4 shadow">
    <h1 class="text-lg font-medium text-center">
      <slot>Header</slot>
    </h1>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>
