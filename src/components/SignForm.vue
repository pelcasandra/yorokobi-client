<template>
  <div class="sign bg-indigo-200 h-screen">
    <div class="mx-auto h-full flex flex-col justify-center items-center">
      <svg class="fill-current text-indigo-600 inline-block h-12 w-12 mb-6">
        <use xlink:href="@/assets/images/icon-sprite.svg#brand"></use>
      </svg>
      <slot name="header" class="mb-6">
        <h1 class="text-3xl">Yorokobi</h1>
      </slot>
      <slot></slot>
      <div class="mt-4 text-sm">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignForm'
}
</script>
