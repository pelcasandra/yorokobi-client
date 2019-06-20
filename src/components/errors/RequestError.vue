<template>
  <div class="m-auto p-8 h-full text-center">
    <router-link :to="{ name: 'workspaces' }" class="mx-auto">
      <svg class="fill-current text-indigo-600 inline-block h-16 w-16 mb-6">
        <use xlink:href="@/assets/images/icon-sprite.svg#brand"></use>
      </svg>
    </router-link>
    <h1 class="text-4xl font-bold">
      <slot name="title"></slot>
    </h1>
    <p class="mt-4">
      <slot name="description"></slot>
    </p>
  </div>
</template>

<script>
import FlexCenter from '@/mixins/FlexCenter.js'

export default {
  mixins: [FlexCenter]
}
</script>
