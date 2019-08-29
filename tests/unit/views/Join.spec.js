import { shallowMount } from '@vue/test-utils'
import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import Join from '@/views/Join'
import Vuelidate from 'vuelidate'
import FormGroup from '@/components/FormGroup'
import vuelidateErrorExtractor, { templates } from 'vuelidate-error-extractor'

Vue.use(Vuex)
Vue.use(Vuelidate)
Vue.use(vuelidateErrorExtractor, { template: FormGroup })
Vue.component('FormWrapper', templates.FormWrapper)

describe('Join.vue', () => {
  const full_name = 'John Smith'
  const email = 'john@yorokobi.com'
  const password = '123456'
  let wrapper
  let store
  let actions

  beforeEach(() => {
    window.scrollTo = jest.fn()
    actions = { register: jest.fn() }
    store = new Vuex.Store({ actions })

    wrapper = shallowMount(Join, {
      store,
      router,
      stubs: {
        BaseButton: '<div />',
        BaseInput: '<div />',
        BaseInputGroup: '<div />'
      }
    })
  })

  it('validates full name presence', () => {
    expect(wrapper.vm.$v.user.full_name.required).toBe(false)
  })

  it('validates email presence', () => {
    expect(wrapper.vm.$v.user.email.required).toBe(false)
  })

  it('validates email format', () => {
    wrapper.setData({ user: { email: '#' } })
    expect(wrapper.vm.$v.user.email.email).toBe(false)
  })

  it('validates password presence', () => {
    expect(wrapper.vm.$v.user.password.newRequired).toBe(false)
  })

  it('validates password length', () => {
    wrapper.setData({ user: { password: '123' } })
    expect(wrapper.vm.$v.user.password.minLength).toBe(false)
  })

  it('validates password confirmation', () => {
    wrapper.setData({ user: { password } })
    expect(wrapper.vm.$v.user.password_confirmation.sameAsPassword).toBe(false)
  })

  it('validates fields on submit', () => {
    wrapper.find('form').trigger('submit')
    expect(wrapper.vm.$v.$anyError).toBe(true)
  })

  it('does not dispatches register action having errors on submit', () => {
    wrapper.find('form').trigger('submit')
    expect(actions.register.mock.calls).toHaveLength(0)
  })

  it('dispatches register action', () => {
    actions.register.mockReturnValue(Promise.resolve(true))
    wrapper.setData({
      user: {
        full_name,
        email,
        password,
        password_confirmation: password
      }
    })
    wrapper.find('form').trigger('submit')
    expect(wrapper.vm.$v.$anyError).toBe(false)
    expect(actions.register.mock.calls).toHaveLength(1)
  })
})
