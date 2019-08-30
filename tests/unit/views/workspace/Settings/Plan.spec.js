import { shallowMount } from '@vue/test-utils'
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Plan from '@/views/workspace/Settings/Plan'
import { templates } from 'vuelidate-error-extractor'
import { def, subject } from 'bdd-lazy-var/global'

Vue.component('BaseButton', require('@/components/BaseButton.vue'))
Vue.component('FormWrapper', templates.FormWrapper)

Vue.use(Vuelidate)

describe('Plan.vue', () => {
  def('canceled', () => false)

  let wrapper

  beforeEach(() => {
    let subscription = {
      subscribed: $subscribed,
      canceled: $canceled
    }

    let workspace = {
      plan: 'hobbyist',
      subscription: subscription
    }

    wrapper = shallowMount(Plan, {
      propsData: { workspace },
      methods: {
        getPlans: jest.fn(),
        fetchPaymentMethods: jest.fn()
      },
      computed: {
        paymentMethod: jest.fn(),
        paymentMethodIsLoaded: jest.fn()
      }
    })
  })

  describe('no subscription', () => {
    def('subscribed', () => false)

    it('disables submit button when no new plan is selected', () => {
      wrapper.setData({ form: { plan: 'hobbyist' } })
      expect(wrapper.find('base-button-stub[disabled]').exists()).toBe(true)
    })

    it('enables submit button when new plan is selected', () => {
      wrapper.setData({ form: { plan: 'production' } })
      expect(wrapper.find('base-button-stub[disabled]').exists()).toBe(false)
    })

    it('hides cancelation button', () => {
      expect(wrapper.find('[name="btn-cancel-subscription"]').exists()).toBe(
        false
      )
    })
  })

  describe('subscribed', () => {
    def('subscribed', () => true)

    it('shows cancelation button', () => {
      expect(wrapper.find('[name="btn-cancel-subscription"]').exists()).toBe(
        true
      )
    })
    it('shows cancelation button text', () => {
      expect(wrapper.find('[name="btn-cancel-subscription"]').text()).toBe(
        'Cancel subscription'
      )
    })
  })

  describe('canceled', () => {
    def('canceled', () => true)

    it('enables submit button when same plan is selected', () => {
      expect(wrapper.find('base-button-stub[disabled]').exists()).toBe(false)
    })

    it('hides cancelation button', () => {
      expect(wrapper.find('[name="btn-cancel-subscription"]').exists()).toBe(
        false
      )
    })
  })
})
