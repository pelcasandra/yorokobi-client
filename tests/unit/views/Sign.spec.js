import { shallowMount } from '@vue/test-utils'
import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import Sign from '@/views/Sign'
import Vuelidate from 'vuelidate'
import FormGroup from '@/components/FormGroup'
import vuelidateErrorExtractor, { templates } from 'vuelidate-error-extractor'

Vue.use(Vuex)
Vue.use(Vuelidate)
Vue.use(vuelidateErrorExtractor, { template: FormGroup })
Vue.component('FormWrapper', templates.FormWrapper)

describe('Sign.vue', () => {
  const email = 'john@yorokobi.com'
  const password = '123456'
  let wrapper
  let store
  let actions

  beforeEach(() => {
    actions = { login: jest.fn() }
    store = new Vuex.Store({ actions })

    wrapper = shallowMount(Sign, {
      store,
      router,
      stubs: {
        BaseInput: '<div />',
        BaseInputGroup: '<div />'
      }
    })
  })

  it('validates email presence', () => {
    expect(wrapper.vm.$v.user.email.required).toBe(false)
  })

  it('validates email format', () => {
    wrapper.setData({ user: { email: '#' } })
    expect(wrapper.vm.$v.user.email.email).toBe(false)
  })

  it('validates password presence', () => {
    expect(wrapper.vm.$v.user.password.required).toBe(false)
  })

  it('validates password length', () => {
    wrapper.setData({ user: { password: '123' } })
    expect(wrapper.vm.$v.user.password.minLength).toBe(false)
  })

  it('validates fields on submit', () => {
    wrapper.find('form').trigger('submit')
    expect(wrapper.vm.$v.$anyError).toBe(true)
  })

  it('does not dispatches login action having errors on submit', () => {
    wrapper.find('form').trigger('submit')
    expect(actions.login.mock.calls).toHaveLength(0)
  })

  it('dispatches login action', () => {
    actions.login.mockReturnValue(Promise.resolve(true))
    wrapper.setData({ user: { email, password } })
    wrapper.find('form').trigger('submit')
    expect(wrapper.vm.$v.$anyError).toBe(false)
    expect(actions.login.mock.calls).toHaveLength(1)
  })
})
