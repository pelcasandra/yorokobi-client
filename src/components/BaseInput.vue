<template>
  <div>
    <label
      v-if="label"
      for="name"
      class="block text-gray-700 text-sm mb-2 font-bold"
      >{{ label }}</label
    >
    <input
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :value="value"
      @input="updateValue"
      v-on="listeners"
      v-bind="$attrs"
      class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white inputClass"
      :class="
        validation.$error
          ? 'focus:bg-red-100 bg-red-100 border-red-600'
          : 'focus:border-indigo-500'
      "
    />
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    label: String,
    name: String,
    placeholder: [String, Number],
    type: String,
    validation: Object,
    value: [String, Number]
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.updateValue
      }
    }
  },
  methods: {
    updateValue(event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>
