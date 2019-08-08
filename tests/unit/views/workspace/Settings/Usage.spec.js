import { shallowMount } from '@vue/test-utils'
import Vue from 'vue'
import Usage from '@/views/workspace/Settings/Usage'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

describe('Usage.vue', () => {
  const workspace = {
    id: '1',
    handle: 'workspace',
    name: 'workspace',
    plan: 'hobbyist',
    retention_period: 30,
    quota_used: 0,
    quota_total: 10737418240
  }
  const paymentMethod = {
    id: '1',
    card: {
      brand: 'Visa',
      last4: '3237',
      expiration_month: '2',
      expiration_year: '2023'
    },
    workspace_id: '1'
  }
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Usage, {
      propsData: { workspace },
      computed: {
        paymentMethod() {
          return paymentMethod
        }
      }
    })
  })

  it('display quota legend', () => {
    expect(
      wrapper
        .html()
        .replace(/\s{2,}/g, ' ')
        .includes('Using 0 B of 10 GB')
    ).toBe(true)
  })

  it('backup retention', () => {
    expect(
      wrapper
        .text()
        .replace(/\s{2,}/g, ' ')
        .includes('Your backups retention period is 30 days.')
    ).toBe(true)
  })

  it('display payment method brand', () => {
    expect(
      wrapper
        .text()
        .replace(/\s{2,}/g, ' ')
        .includes('Visa')
    ).toBe(true)
  })
})
