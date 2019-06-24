import { shallowMount } from '@vue/test-utils'
import Sign from '@/views/Sign'

describe('Sign.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(Sign)
  })

  it('renders this.email when passed', () => {
    wrapper.setData({ email: 'martin@yorokobi.com' })
    expect(wrapper.vm.email).toBe('martin@yorokobi.com')
  })
})
