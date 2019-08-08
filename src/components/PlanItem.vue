<template>
  <label
    :for="plan.name"
    class="first-child:rounded-t last-child:rounded-b last-child:border-b-0 plan-item p-5 border-b-2 hover:bg-indigo-100 focus:bg-indigo-200 block cursor-pointer"
    :class="{ 'bg-indigo-100': checked }"
  >
    <div class="flex items-center text-gray-700">
      <div class="mr-4">
        <input
          type="radio"
          name="plan"
          :id="plan.name"
          :value="plan.name"
          :checked="checked"
          @input="updateValue"
        />
      </div>
      <div class="description flex-grow">
        <h4 class="font-bold">{{ plan.name | capitalize }}</h4>
        <div class="text-sm">{{ plan.total_size | filesize }} of storage</div>
        <div class="text-sm">{{ plan.retention_period }} days of retention</div>
      </div>
      <div class="text-right font-medium">{{ plan.price | money }}</div>
    </div>
  </label>
</template>

<script>
import capitalize from 'lodash/capitalize'
import filesize from 'filesize'

export default {
  name: 'PlanItem',
  props: {
    checked: Boolean,
    plan: {
      type: Object,
      required: true
    }
  },
  methods: {
    updateValue(event) {
      this.$emit('input', event.target.value)
    }
  },
  filters: {
    capitalize: value => capitalize(value),
    filesize: value => filesize(value),
    money: value => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
      }).format(value / 100)
    }
  }
}
</script>
