<template>
  <section class="flex-grow flex flex-col items-center">
    <h1 class="my-8 text-2xl font-bold text-center">Choose Plan</h1>
    <form-wrapper
      :validator="$v.form"
      class="lg:w-2/3 w-4/5"
      :messages="validationMessages"
    >
      <form @submit.prevent="updateSubscription">
        <template v-if="plans && workspace">
          <form-request-errors
            :errors="requestErrors"
            :validator="$v.form"
            class="mb-6"
          />
          <div class="bg-white rounded shadow-md mb-6">
            <PlanItem
              v-for="plan in plans"
              :key="plan.name"
              :plan="plan"
              :checked="form.plan === plan.name"
              @input="selectPlan"
            ></PlanItem>
          </div>
          <stripe-loader>
            <div class="bg-white rounded shadow-md p-6 mb-6">
              <div class="font-bold text-gray-700">Payment details</div>
              <div v-if="paymentMethod" class="flex my-5">
                <div class="mr-4">
                  <input
                    type="radio"
                    name="newMethod"
                    checked="checked"
                    :value="false"
                    v-model="newMethod"
                  />
                </div>
                <payment-method :method="paymentMethod" />
              </div>
              <div class="flex my-6">
                <div v-if="paymentMethod" class="mr-4">
                  <input
                    type="radio"
                    name="newMethod"
                    :value="true"
                    v-model="newMethod"
                  />
                </div>
                <card
                  class="stripe-card flex-grow"
                  :class="{ complete }"
                  stripe="pk_test_cBWcHnD8btt5s78OJNviOeXw"
                  :options="stripeOptions"
                  @change="setStripeTokenOnComplete($event)"
                />
              </div>
              <div
                class="text-sm mb-6 font-medium text-red-600"
                v-if="
                  $v.form.newMethod.$dirty && !$v.form.newMethod.tokenRequired
                "
              >
                <p>Please enter your credit card details.</p>
              </div>
              <div class="flex items-center mb-6 text-sm text-gray-700">
                <svg class="fill-current text-gray-500 h-4 w-4 mr-1">
                  <use xlink:href="@/assets/images/icon-sprite.svg#lock" />
                </svg>
                <div class>Secured by Stripe.</div>
              </div>
              <base-button
                :loading="state.waitingRemoteResponse"
                :disabled="noPlanSelected"
                >Pay with credit card</base-button
              >
            </div>
          </stripe-loader>
        </template>
        <base-spinner v-else />
      </form>
    </form-wrapper>
  </section>
</template>

<script>
import PaymentMethod from '@/components/PaymentMethod'
import PlanItem from '@/components/PlanItem'
import StripeLoader from '@/components/StripeLoader'
import PaymentMethodMixin from '@/mixins/PaymentMethod.js'
import RemoteValidation from '@/mixins/RemoteValidation'
import PlanService from '@/services/PlanService.js'
import capitalize from 'lodash/capitalize'
import has from 'lodash/has'

import { normalize, schema } from 'normalizr'
import { Card, createToken } from 'vue-stripe-elements-plus'

const plan = new schema.Entity('plans', {}, { idAttribute: 'name' })

export default {
  components: {
    Card,
    PaymentMethod,
    PlanItem,
    StripeLoader
  },
  props: ['workspace'],
  mixins: [PaymentMethodMixin, RemoteValidation],
  data() {
    return {
      complete: false,
      form: {
        plan: null
      },
      newMethod: true,
      newStripeToken: null,
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
      validationMessages: {
        tokenRequired: 'Please enter your credit card details.'
      }
    }
  },
  watch: {
    workspace: {
      immediate: true,
      handler: 'selectExistingPlan'
    },
    paymentMethodIsLoaded: {
      immediate: true,
      handler: 'selectPreviouslyUsedMethod'
    }
  },
  computed: {
    currentMethodToken() {
      return this.newMethod ? this.newStripeToken : this.paymentMethod.id
    },
    dispatchableWorkspace() {
      return {
        id: this.workspace.id,
        payment_method_token: this.currentMethodToken,
        plan_name: this.form.plan
      }
    },
    formIsValid() {
      return !this.$v.form.$invalid
    },
    noPlanSelected() {
      return this.form.plan === this.workspace.plan
    }
  },
  mounted() {
    this.getPlans()
  },
  methods: {
    getPlans() {
      PlanService.getPlans().then(({ data }) => {
        const plans = normalize(data, { plans: [plan] })
        this.plans = plans.entities.plans
      })
    },
    selectExistingPlan() {
      if (this.workspace) {
        this.form.plan = this.workspace.plan
      }
    },
    selectPlan(value) {
      this.form.plan = value
    },
    selectPreviouslyUsedMethod() {
      if (this.workspace && this.paymentMethod) {
        this.newMethod = false
      }
    },
    setStripeToken() {
      createToken().then(data => {
        this.newStripeToken = data.token.id
      })
    },
    setStripeTokenOnComplete(event) {
      if (event.complete) {
        this.setStripeToken()
      }
    },
    updateSubscription() {
      this.$v.form.$touch()
      if (this.formIsValid) {
        this.state.waitingRemoteResponse = true
        return this.$store
          .dispatch('updateWorkspaceSubscription', this.dispatchableWorkspace)
          .then(() => {
            this.$router.push({
              name: 'workspace_subscription_usage',
              params: {
                handle: this.workspace.handle,
                successMessage:
                  'You successfully upgraded to ' +
                  (this.workspace.plan === 'enterprise' ? 'an' : 'a') +
                  ' <strong>' +
                  capitalize(this.workspace.plan) +
                  '</strong> plan.<br />Thanks for your support and trust in Yorokobi.'
              }
            })
          })
          .catch(error => {
            this.state.waitingRemoteResponse = false
            if (has(error, 'response.data.errors')) {
              this.requestErrors = error.response.data.errors
            }
          })
      }
    }
  },
  validations: {
    form: {
      newMethod: {
        tokenRequired() {
          return (this.newMethod && !!this.newStripeToken) || !this.newMethod
        }
      }
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
