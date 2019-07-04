<template>
  <div class="m-auto p-8 h-full w-full">
    <div class="flex flex-col justify-center items-center">
      <svg class="fill-current text-indigo-600 inline-block h-12 w-12 mb-6">
        <use xlink:href="@/assets/images/icon-sprite.svg#brand" />
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
import FlexCenter from '@/mixins/FlexCenter.js'

export default {
  name: 'SignForm',
  mixins: [FlexCenter]
}
</script>
