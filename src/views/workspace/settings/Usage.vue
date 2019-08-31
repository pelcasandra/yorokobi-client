<template>
  <section class="flex-grow flex flex-col items-center">
    <h1 class="my-8 text-2xl font-bold text-center">Usage & Plan</h1>
    <alert-success :message="successMessage" class="lg:w-2/3 w-4/5" />
    <div v-if="workspace && paymentMethodIsLoaded" class="lg:w-2/3 w-4/5">
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
            <span>{{ workspace.plan | capitalize }}</span>
            <span v-if="canceledStillValid"></span>
          </h2>
          <div class="text-sm text-gray-700">
            Your backups retention period is
            {{ workspace.retention_period }} days.
          </div>
        </div>
        <div
          class="p-6 border-b-2 py-5 bg-yellow-100"
          v-if="canceledStillValid"
        >
          <div class="text-sm text-gray-700">
            Your plan will be downgraded to Developer on
            {{ workspace.subscription.ends_at | moment('LL') }}.
          </div>
        </div>
        <div class="p-6 py-4">
          <router-link
            :to="{ name: 'change_plan' }"
            name="btn-change-plan"
            class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline text-center w-40"
            tag="button"
          >
            {{
              workspace.subscription.canceled ? 'Re-enable Now' : 'Change Plan'
            }}
          </router-link>
        </div>
      </div>
      <div class="mt-8 bg-white shadow-md rounded mb-4">
        <div class="p-6 pb-5" :class="paymentMethod ? 'border-b-2' : ''">
          <div class="font-bold text-gray-700 mb-4">Payment method</div>
          <payment-method-item v-if="paymentMethod" :method="paymentMethod" />
          <div v-else class="text-gray-700 text-sm">
            No payment method found.
          </div>
        </div>
        <div class="p-6 py-4" v-if="paymentMethod">
          <router-link
            :to="{ name: 'change_payment_method' }"
            class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline text-center"
            tag="button"
            >Change Payment method</router-link
          >
        </div>
      </div>
    </div>
    <base-spinner v-else />
  </section>
</template>

<script>
import capitalize from 'lodash/capitalize'
import filesize from 'filesize'
import AlertSuccess from '@/components/AlertSuccess'
import PaymentMethodItem from '@/components/PaymentMethodItem'
import PaymentMethodMixin from '@/mixins/PaymentMethod.js'

export default {
  components: { AlertSuccess, PaymentMethodItem },
  name: 'Usage',
  props: ['successMessage', 'workspace'],
  mixins: [PaymentMethodMixin],
  computed: {
    canceledStillValid() {
      return (
        this.workspace.subscription.canceled &&
        this.workspace.subscription.subscribed
      )
    },
    currentUsagePercentage() {
      return (
        parseInt(
          (this.workspace.quota_total / this.workspace.quota_used) * 100
        ) || 0
      )
    }
  },
  filters: {
    capitalize: value => capitalize(value),
    filesize: value => filesize(value)
  }
}
</script>
