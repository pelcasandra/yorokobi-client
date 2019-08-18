<template>
  <div class="text-gray-700 text-sm flex items-center">
    <svg
      class="bg-gray-200 fill-current text-indigo-500 mr-3 rounded"
      width="45"
      height="28.13"
      :alt="method.card.brand"
      :title="method.card.brand"
    >
      <use
        :xlink:href="
          require(`@/assets/images/icon-sprite.svg`) +
            `#${this.parameterizeBrand}`
        "
      />
    </svg>
    <div>{{ method.card.brand }}</div>
    <div class="ml-3">•••• •••• •••• {{ method.card.last4 }}</div>
  </div>
</template>

<script>
export default {
  props: ['method'],
  computed: {
    parameterizeBrand() {
      return this.method.card.brand.toLowerCase().replace(' ', '-')
    }
  }
}
</script>
