import { shallowMount } from '@vue/test-utils'
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Plan from '@/views/workspace/Settings/Plan'
import { templates } from 'vuelidate-error-extractor'

Vue.use(Vuelidate)
Vue.component('FormWrapper', templates.FormWrapper)

describe('Plan.vue', () => {
  const workspace = {
    plan: 'hobbyist'
  }
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Plan, {
      propsData: { workspace },
      methods: {
        getPlans: jest.fn(),
        fetchPaymentMethods: jest.fn()
      },
      computed: {
        paymentMethod: jest.fn(),
        paymentMethodIsLoaded: jest.fn()
      },
      stubs: {
        BaseButton: '<button />'
      }
    })
  })

  it('disables submit button when no plan is selected', () => {
    wrapper.setData({ form: { plan: 'hobbyist' } })
    expect(wrapper.find('button[disabled]').exists()).toBe(true)
  })

  it('enables submit button when plan is selected', () => {
    wrapper.setData({ form: { plan: 'production' } })
    expect(wrapper.find('button[disabled]').exists()).toBe(false)
  })
})
