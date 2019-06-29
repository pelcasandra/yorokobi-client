import { shallowMount } from '@vue/test-utils'
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import VueLodash from 'vue-lodash'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

import NewWorkspace from '@/views/NewWorkspace'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(Vuelidate)
Vue.use(VueLodash)

describe('NewWorkspace.vue', () => {
  let wrapper
  let store
  let actions
  let state

  beforeEach(() => {
    state = { data: {} }
    actions = {
      createWorkspace: jest.fn()
    }

    store = new Vuex.Store({
      state,
      actions
    })

    wrapper = shallowMount(NewWorkspace, {
      store
    })
  })

  it('set automatic handle from any given name', () => {
    wrapper.setData({ name: 'New @Workspace' })
    expect(wrapper.vm.handle).toBe('new-workspace')
  })

  it('prevents manually set handle to be replaced by a new name', () => {
    wrapper.setData({ automaticHandle: false })
    wrapper.setData({ handle: '123' })
    wrapper.setData({ name: 'New Workspace' })
    expect(wrapper.vm.handle).toBe('123')
  })

  it('validates empty fields', () => {
    wrapper.find('form').trigger('submit')
    expect(wrapper.vm.$v.$anyError).toBe(true)
    expect(wrapper.vm.$v.name.required).toBe(false)
    expect(wrapper.vm.$v.handle.required).toBe(false)
  })

  it('dispatches createWorksapce action', () => {
    wrapper.setData({ name: 'My Workspace' })
    wrapper.setData({ handle: 'my-workspace' })
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

    wrapper.setData({ name: 'My Workspace' })
    wrapper.setData({ handle: 'my-workspace' })
    wrapper.setData({ requestErrors })
    wrapper.find('form').trigger('submit')

    expect(wrapper.vm.$v.handle.taken).toBe(false)
    wrapper.setData({ handle: 'new-workspace-handle' })
    expect(wrapper.vm.$v.handle.taken).toBe(true)
  })
})
