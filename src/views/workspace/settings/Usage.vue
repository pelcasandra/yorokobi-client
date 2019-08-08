<template>
  <section class="flex-grow flex flex-col items-center">
    <h1 class="my-8 text-2xl font-bold text-center">Usage & Plan</h1>
    <div v-if="workspace && paymentMethod" class="lg:w-2/3 w-4/5">
      <div class="bg-white shadow-md rounded mb-4 p-6 text-gray-700">
        <div class="flex w-full justify-between items-end">
          <div class="font-bold">Your current usage</div>
          <div class="text-sm">
            Using {{ this.workspace.quota_used | filesize }} of
            {{ this.workspace.quota_total | filesize }}
          </div>
        </div>
        <div class="h-6 bg-gray-200 mt-5 mb-5 rounded">
          <div
            class="bg-indigo-400 h-6 w-half rounded"
            :style="{
              width: `${this.currentUsagePercentage}` + '%'
            }"
          />
        </div>
        <div class="flex items-center">
          <div class="h-4 w-4 rounded bg-indigo-400 mr-2" />
          <div class="text-sm">PostgreSQL</div>
        </div>
      </div>
      <div class="mt-8 bg-white shadow-md rounded mb-8">
        <div class="p-6 border-b-2 pb-5">
          <div class="font-bold text-gray-700">Your current plan</div>
          <h2 class="text-xl font-bold my-2 text-gray-700">
            {{ workspace.plan | capitalize }}
          </h2>
          <div class="text-sm text-gray-700">
            Your backups retention period is
            {{ workspace.retention_period }} days.
          </div>
        </div>
        <div class="p-6 py-5">
          <router-link
            :to="{ name: 'change_plan' }"
            class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline text-center w-40"
            tag="button"
            >Change Plan</router-link
          >
        </div>
      </div>
      <div class="mt-8 bg-white shadow-md rounded mb-4 p-6">
        <div class="font-bold text-gray-700 mb-4">Payment method</div>
        <div
          v-if="paymentMethod"
          class="text-gray-700 text-sm flex items-center"
        >
          <svg
            class="bg-gray-200 fill-current text-indigo-500 mr-3 rounded"
            width="45"
            height="28.13"
            :alt="paymentMethod.card.brand"
            :title="paymentMethod.card.brand"
          >
            <use
              :xlink:href="
                require(`@/assets/images/icon-sprite.svg`) +
                  `#${this.cardBrandParameterized}`
              "
            />
          </svg>
          <div>{{ paymentMethod.card.brand }}</div>
          <div class="ml-3">•••• •••• •••• {{ paymentMethod.card.last4 }}</div>
        </div>
      </div>
    </div>
    <base-spinner v-else />
  </section>
</template>

<script>
import capitalize from 'lodash/capitalize'
import filesize from 'filesize'
import PaymentMethod from '@/mixins/PaymentMethod.js'

export default {
  name: 'Usage',
  props: ['workspace'],
  mixins: [PaymentMethod],
  computed: {
    currentUsagePercentage() {
      return (
        parseInt(
          (this.workspace.quota_total / this.workspace.quota_used) * 100
        ) || 0
      )
    },
    cardBrandParameterized() {
      return this.paymentMethod.card.brand.toLowerCase().replace(' ', '-')
    }
  },
  watch: {
    workspace: {
      immediate: true,
      handler: 'fetchPaymentMethods'
    }
  },
  methods: {
    fetchPaymentMethods() {
      if (this.workspace && !this.paymentMethod) {
        this.$store.dispatch('fetchPaymentMethods')
      }
    }
  },
  filters: {
    capitalize: value => capitalize(value),
    filesize: value => filesize(value)
  }
}
</script>
