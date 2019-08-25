import { shallowMount } from '@vue/test-utils'
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import VueLodash from 'vue-lodash'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import General from '@/views/workspace/Settings/General'
import { templates } from 'vuelidate-error-extractor'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(Vuelidate)
Vue.use(VueLodash)
Vue.component('FormWrapper', templates.FormWrapper)

describe('General.vue', () => {
  const workspace = { id: '1', name: 'workspace', handle: 'workspace' }
  let wrapper
  let state
  let actions
  let getters
  let store

  beforeEach(() => {
    state = {
      workspace: {
        alreadyFetched: true,
        workspaces: {
          '1': workspace
        }
      }
    }

    actions = { updateWorkspace: jest.fn() }

    getters = {
      getWorkspaceByHandle: () => () => {
        return workspace
      }
    }

    store = new Vuex.Store({
      state,
      getters,
      actions
    })

    wrapper = shallowMount(General, {
      store,
      propsData: {
        handle: 'workspace'
      },
      data: function() {
        return {
          form: workspace
        }
      },
      stubs: {
        BaseButton: '<div />',
        BaseInput: '<div />',
        BaseInputGroup: '<div />',
        FormGroup: '<div />'
      }
    })
  })

  it('does not set automatic handle from any given name', () => {
    wrapper.setData({ form: { name: 'New @Workspace' } })
    expect(wrapper.vm.form.handle).toBe('workspace')
  })

  it('validates empty fields', () => {
    wrapper.setData({ form: { name: '', handle: '' } })
    wrapper.find('form').trigger('submit')
    expect(wrapper.vm.$v.$anyError).toBe(true)
    expect(wrapper.vm.$v.form.name.required_name).toBe(false)
    expect(wrapper.vm.$v.form.handle.required_handle).toBe(false)
  })

  it('dispatches updateWorkspace action', () => {
    wrapper.setData({
      form: { name: 'Edited Workspace', handle: 'edited-workspace' }
    })
    wrapper.find('form').trigger('submit')
    expect(actions.updateWorkspace.mock.calls).toHaveLength(1)
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

    wrapper.setData({ requestErrors })
    wrapper.find('form').trigger('submit')

    expect(wrapper.vm.$v.form.handle.taken).toBe(false)
    wrapper.setData({ form: { handle: 'new-workspace-handle' } })
    expect(wrapper.vm.$v.form.handle.taken).toBe(true)
  })
})
