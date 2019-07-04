import { shallowMount } from '@vue/test-utils'
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import VueLodash from 'vue-lodash'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Settings from '@/views/workspace/Settings'
import { templates } from 'vuelidate-error-extractor'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(Vuelidate)
Vue.use(VueLodash)
Vue.component('FormWrapper', templates.FormWrapper)

describe('Settings.vue', () => {
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

    wrapper = shallowMount(Settings, {
      store,
      propsData: {
        handle: 'workspace'
      },
      data: function() {
        return {
          workspace: workspace
        }
      },
      stubs: {
        FormGroup: '<div />',
        BaseInput: '<div />',
        BaseInputGroup: '<div />'
      }
    })
  })

  it('does not set automatic handle from any given name', () => {
    wrapper.setData({ workspace: { name: 'New @Workspace' } })
    expect(wrapper.vm.workspace.handle).toBe('workspace')
  })

  it('validates empty fields', () => {
    wrapper.setData({ workspace: { name: '' } })
    wrapper.setData({ workspace: { handle: '' } })
    wrapper.find('form').trigger('submit')
    expect(wrapper.vm.$v.$anyError).toBe(true)
    expect(wrapper.vm.$v.workspace.name.required_name).toBe(false)
    expect(wrapper.vm.$v.workspace.handle.required_handle).toBe(false)
  })

  it('dispatches updateWorkspace action', () => {
    wrapper.setData({ workspace: { name: 'Edited Workspace' } })
    wrapper.setData({ workspace: { handle: 'edited-workspace' } })
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

    expect(wrapper.vm.$v.workspace.handle.taken).toBe(false)
    wrapper.setData({ workspace: { handle: 'new-workspace-handle' } })
    expect(wrapper.vm.$v.workspace.handle.taken).toBe(true)
  })
})
