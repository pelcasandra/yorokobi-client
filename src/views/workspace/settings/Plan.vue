<template>
  <section class="flex-grow flex flex-col items-center">
    <h1 class="my-8 text-2xl font-bold text-center">Choose Plan</h1>
    <div v-if="plans && workspace" class="lg:w-2/3 w-4/5">
      <div class="bg-white rounded shadow-md mb-6">
        <PlanItem
          v-for="plan in plans"
          :key="plan.name"
          :plan="plan"
          :checked="subscription.plan === plan.name"
          @input="setCheckedPlan"
        ></PlanItem>
      </div>
      <stripe-loader>
        <div class="bg-white rounded shadow-md p-6">
          <div class="font-bold text-gray-700">Payment details</div>
          <card
            class="stripe-card my-6"
            :class="{ complete }"
            stripe="pk_test_cBWcHnD8btt5s78OJNviOeXw"
            :options="stripeOptions"
            @change="complete = $event.complete"
          />
          <div class="flex items-center mb-6 text-sm text-gray-700">
            <svg class="fill-current text-gray-500 h-4 w-4 mr-1">
              <use xlink:href="@/assets/images/icon-sprite.svg#lock" />
            </svg>
            <div class>Secured by Stripe.</div>
          </div>
          <button
            class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            @click="pay"
            :disabled="!complete"
          >
            Pay with credit card
          </button>
        </div>
      </stripe-loader>
    </div>
    <base-spinner v-else />
  </section>
</template>

<script>
import Workspace from '@/mixins/Workspace.js'
import PlanItem from '@/components/PlanItem'
import StripeLoader from '@/components/StripeLoader'
import PlanService from '@/services/PlanService.js'
import { normalize, schema } from 'normalizr'
import { Card, createToken } from 'vue-stripe-elements-plus'

const plan = new schema.Entity('plans', {}, { idAttribute: 'name' })

export default {
  components: { Card, PlanItem, StripeLoader },
  props: ['handle'],
  mixins: [Workspace],
  data() {
    return {
      complete: false,
      plans: {},
      stripeOptions: {
        style: {
          base: {
            color: '#4a5568',
            fontSize: '16px',
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
            fontSmoothing: 'antialiased'
          }
        }
      },
      subscription: {
        plan: null
      },
      token: null
    }
  },
  watch: {
    workspace: {
      immediate: true,
      handler: 'setCurrentPlanAsDefault'
    }
  },
  mounted() {
    PlanService.getPlans().then(({ data }) => {
      const plans = normalize(data, { plans: [plan] })
      this.plans = plans.entities.plans
    })
  },
  methods: {
    setCurrentPlanAsDefault() {
      if (this.workspace) {
        this.subscription.plan = this.workspace.plan
      }
    },
    setCheckedPlan(value) {
      this.subscription.plan = value
    },
    pay() {
      createToken().then(data => (this.token = data.token))
    }
  }
}
</script>

<style>
.StripeElement {
  @apply bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight text-base;
}
.StripeElement--focus {
  @apply bg-white outline-none border-indigo-500;
}
.StripeElement--invalid {
  @apply bg-red-100 bg-red-100 border-red-600;
}
</style>
