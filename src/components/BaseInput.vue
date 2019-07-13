<template>
  <input
    :type="type"
    :name="name"
    :placeholder="placeholder"
    :value="value"
    @input="updateValue"
    v-on="listeners"
    class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white"
    :class="
      hasErrors
        ? 'focus:bg-red-100 bg-red-100 border-red-600'
        : 'focus:border-indigo-500'
    "
  />
</template>

<script>
export default {
  name: 'BaseInput',
  props: {
    error: Object,
    name: String,
    placeholder: [String, Number],
    type: { type: String, default: 'text' },
    validation: Object,
    value: [String, Number]
  },
  computed: {
    hasErrors() {
      return this.validation && this.validation.$error
    },
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
