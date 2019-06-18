import { shallowMount } from '@vue/test-utils'
import Sign from '@/components/Sign.vue'

describe('Sign.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(Sign, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
