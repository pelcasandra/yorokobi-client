import { shallowMount } from '@vue/test-utils'
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import VueLodash from 'vue-lodash'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import NewWorkspace from '@/views/NewWorkspace'
import { templates } from 'vuelidate-error-extractor'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(Vuelidate)
Vue.use(VueLodash)
Vue.component('FormWrapper', templates.FormWrapper)

describe('NewWorkspace.vue', () => {
  let wrapper
  let actions
  let store

  beforeEach(() => {
    actions = { createWorkspace: jest.fn() }

    store = new Vuex.Store({ actions })

    wrapper = shallowMount(NewWorkspace, {
      store,
      stubs: {
        FormGroup: '<div />',
        BaseInput: '<div />',
        BaseInputGroup: '<div />'
      }
    })
  })

  it('set automatic handle from any given name', () => {
    wrapper.setData({ form: { name: 'New @Workspace' } })
    expect(wrapper.vm.form.handle).toBe('new-workspace')
  })

  it('prevents manually set handle to be replaced by a new name', () => {
    wrapper.setData({ automaticHandle: false })
    wrapper.setData({ form: { name: 'New Workspace', handle: '123' } })
    expect(wrapper.vm.form.handle).toBe('123')
  })

  it('validates empty fields', () => {
    wrapper.find('form').trigger('submit')
    expect(wrapper.vm.$v.$anyError).toBe(true)
    expect(wrapper.vm.$v.form.name.required_name).toBe(false)
    expect(wrapper.vm.$v.form.handle.required_handle).toBe(false)
  })

  it('dispatches createWorksapce action', () => {
    actions.createWorkspace.mockReturnValue(Promise.resolve(true))
    wrapper.setData({
      form: {
        name: 'My Workspace',
        handle: 'my-workspace'
      }
    })
    wrapper.find('form').trigger('submit')
    expect(actions.createWorkspace.mock.calls).toHaveLength(1)
  })

  it('validates handle is taken', () => {
    let requestErrors = [
      {
        code: 'taken',
        field: 'handle',
        mesage: 'Handle has already been taken',
        resource: 'Workspace',
        type: 'validation_failed'
      }
    ]

    wrapper.setData({
      form: {
        name: 'My Workspace',
        handle: 'my-workspace'
      }
    })
    wrapper.setData({ requestErrors })
    wrapper.find('form').trigger('submit')

    expect(wrapper.vm.$v.form.handle.taken).toBe(false)
    wrapper.setData({ form: { handle: 'new-workspace-handle' } })
    expect(wrapper.vm.$v.form.handle.taken).toBe(true)
  })
})
