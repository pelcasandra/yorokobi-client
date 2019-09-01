<template>
  <section class="flex-grow flex flex-col items-center">
    <h1 class="my-8 text-2xl font-bold text-center">Change Payment method</h1>
    <form-wrapper
      :validator="$v.form"
      class="lg:w-2/3 w-4/5"
      :messages="validationMessages"
    >
      <form @submit.prevent="updatePaymentMethod">
        <form-request-errors
          :errors="requestErrors"
          :validator="$v.form"
          class="mb-6"
        />
        <div v-if="workspace && paymentMethodIsLoaded">
          <div
            v-if="paymentMethod"
            class="bg-white shadow-md rounded mb-8 p-6 text-gray-700"
          >
            <div class="font-bold mb-5">Current payment method</div>
            <payment-method-item :method="paymentMethod" />
          </div>
          <stripe-loader>
            <div class="bg-white shadow-md rounded mb-4 p-6 text-gray-700">
              <div class="font-bold text-gray-700">New payment details</div>
              <div class="my-6">
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
              <base-button :loading="state.waitingRemoteResponse"
                >Update payment method</base-button
              >
            </div>
          </stripe-loader>
        </div>
      </form>
    </form-wrapper>
  </section>
</template>

<script>
import PaymentMethodItem from '@/components/PaymentMethodItem'
import PaymentMethodMixin from '@/mixins/PaymentMethod.js'
import RemoteValidation from '@/mixins/RemoteValidation'
import has from 'lodash/has'

export default {
  components: {
    PaymentMethodItem
  },
  mixins: [PaymentMethodMixin, RemoteValidation],
  data() {
    return {
      validationMessages: {
        tokenRequired: 'Please enter your credit card details.'
      }
    }
  },
  methods: {
    updatePaymentMethod() {
      this.$v.form.$touch()
      if (!this.$v.form.$invalid) {
        this.state.waitingRemoteResponse = true
        return this.$store
          .dispatch('updatePaymentMethod', {
            workspace_id: this.workspace.id,
            payment_method_token: this.newStripeToken
          })
          .then(() => {
            this.$router.push({
              name: 'workspace_subscription_usage',
              params: {
                handle: this.workspace.handle,
                successMessage: 'Your payment details have been updated.'
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
          return !!this.newStripeToken
        }
      }
    }
  }
}
</script>
