import { shallowMount } from '@vue/test-utils'
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import VueLodash from 'vue-lodash'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Settings from '@/views/workspace/Settings'
import workspace from '@/store/modules/workspace.js'
import FormGroup from '@/components/FormGroup'
import vuelidateErrorExtractor, { templates } from 'vuelidate-error-extractor'

Vue.use(Vuex)
Vue.use(VueAxios, axios)
Vue.use(VueRouter)
Vue.use(Vuelidate)
Vue.use(VueLodash)
Vue.use(vuelidateErrorExtractor, {
  template: FormGroup
})
Vue.component('FormWrapper', templates.FormWrapper)

describe('Settings.vue', () => {
  let wrapper
  let store
  let actions
  let state

  beforeEach(() => {
    state = {}

    actions = {
      updateWorkspace: jest.fn()
    }

    store = new Vuex.Store({
      modules: { workspace },
      state,
      actions
    })

    wrapper = shallowMount(Settings, {
      store,
      propsData: {
        handle: 'workspace'
      },
      data: function() {
        return {
          workspace: {
            id: '1',
            name: 'workspace',
            handle: 'workspace'
          }
        }
      },
      stubs: {
        BaseInput: '<div />',
        BaseInputGroup: '<div />'
      }
    })

    wrapper.vm.$store.state.workspace.workspaces = {
      '1': { id: '1', name: 'workspace', handle: 'workspace' }
    }
  })

  it('does not set automatic handle from any given name', () => {
    wrapper.setData({ workspace: { name: 'New @Workspace' } })
    expect(wrapper.vm.workspace.handle).toBe('workspace')
  })

  it('validates empty fields', () => {
    wrapper.find('form').trigger('submit')
    wrapper.setData({ workspace: { name: '' } })
    wrapper.setData({ workspace: { handle: '' } })
    expect(wrapper.vm.$v.$anyError).toBe(true)
    expect(wrapper.vm.$v.workspace.name.required_name).toBe(false)
    expect(wrapper.vm.$v.workspace.handle.required_handle).toBe(false)
  })

  it('dispatches updateWorksapce action', () => {
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
