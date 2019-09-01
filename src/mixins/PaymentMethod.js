import StripeLoader from '@/components/StripeLoader'
import { Card, createToken } from 'vue-stripe-elements-plus'

export default {
  props: ['workspace'],
  components: { Card, StripeLoader },
  computed: {
    paymentMethod() {
      return this.$store.getters.getPaymentMethodByWorkspaceId(
        this.workspace.id
      )
    },
    paymentMethodIsLoaded() {
      return !this.$store.state.payment_method.isLoading
    }
  },
  data() {
    return {
      complete: false,
      newStripeToken: null,
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
      }
    }
  },
  mounted() {
    this.fetchPaymentMethods()
  },
  methods: {
    fetchPaymentMethods() {
      this.$store.dispatch('fetchPaymentMethods')
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
    }
  }
}
