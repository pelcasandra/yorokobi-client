import { shallowMount } from '@vue/test-utils'
import PaymentMethodItem from '@/components/PaymentMethodItem'

describe('PaymentMethodItem.vue', () => {
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
    wrapper = shallowMount(PaymentMethodItem, {
      propsData: { method: paymentMethod }
    })
  })

  it('payment method brand name', () => {
    expect(
      wrapper
        .text()
        .replace(/\s{2,}/g, ' ')
        .includes('Visa')
    ).toBe(true)
  })

  it('last 4 digits', () => {
    expect(
      wrapper
        .text()
        .replace(/\s{2,}/g, ' ')
        .includes('•••• •••• •••• 3237')
    ).toBe(true)
  })

  it('expiration date', () => {
    expect(
      wrapper
        .text()
        .replace(/\s{2,}/g, ' ')
        .includes('Exp. 2/2023')
    ).toBe(true)
  })
})
