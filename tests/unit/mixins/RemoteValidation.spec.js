import { mount } from '@vue/test-utils'
import Vue from 'vue'
import RemoteValidation from '@/mixins/RemoteValidation'
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)

describe('RemoteValidation.js', () => {
  let wrapper

  describe('general form errors', () => {
    let remoteErrors = [
      {
        message: 'Invalid credentials',
        type: 'unauthorized'
      },
      {
        message: 'Invalid credentials',
        type: 'unauthorizedAlternative'
      }
    ]

    beforeEach(() => {
      let MockComponent = {
        template: '<div></div>',
        mixins: [RemoteValidation]
      }

      wrapper = mount(MockComponent)
      wrapper.vm.remoteErrors = remoteErrors
    })

    it('validates when present', () => {
      expect(wrapper.vm.$v.form.unauthorized).toBe(false)
    })

    it('validates correctly when remote error is not present', () => {
      wrapper.vm.remoteErrors = []
      expect(wrapper.vm.$v.form.unauthorized).toBe(undefined)
    })

    it('skip setting validation messages when already defined locally', () => {
      expect(wrapper.vm.validationMessages.unauthorized).toBe(undefined)
    })

    it('set validation message', () => {
      expect(wrapper.vm.validationMessages.unauthorizedAlternative).toBe(
        'Invalid credentials'
      )
    })
  })

  describe('validation errors with matching fields in component', () => {
    let remoteErrors = [
      {
        code: 'required',
        field: 'email',
        message: "Email can't be blank",
        resource: 'User',
        type: 'validation_failed'
      },
      {
        code: 'required_alternative',
        field: 'email',
        message: "Email can't be blank",
        resource: 'User',
        type: 'validation_failed'
      }
    ]

    beforeEach(() => {
      const MockComponent = {
        template: '<div></div>',
        mixins: [RemoteValidation]
      }

      wrapper = mount(MockComponent, {
        data() {
          return {
            user: { email: null }
          }
        },
        computed: {
          validations() {
            return {
              user: {
                email: {
                  taken() {
                    return true
                  }
                }
              }
            }
          }
        }
      })
    })

    it('validates correctly when remote error is present', () => {
      wrapper.vm.remoteErrors = remoteErrors
      expect(wrapper.vm.$v.user.email.taken).toBe(true)
      expect(wrapper.vm.$v.user.email.required).toBe(false)
    })

    it('skip validation when remote error is not present anymore', () => {
      wrapper.vm.remoteErrors = remoteErrors
      expect(wrapper.vm.$v.user.email.required).toBe(false)
      wrapper.vm.remoteErrors = []
      expect(wrapper.vm.$v.user.email.required).toBe(true)
    })

    it('skip setting validation messages when already defined locally', () => {
      expect(wrapper.vm.validationMessages.required).toBe(undefined)
    })

    it('set validation message', () => {
      wrapper.vm.remoteErrors = remoteErrors
      expect(
        wrapper.vm.validationMessages.user_email_required_alternative
      ).toBe("Email can't be blank")
    })
  })

  describe('validation errors without matching fields in component', () => {})
})
