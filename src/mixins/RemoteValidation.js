import Vue from 'vue'
import has from 'lodash/has'

export const defaultValidations = ['unauthorized', 'required']

export default {
  data() {
    return {
      remoteErrors: [],
      validationMessages: {}
    }
  },
  watch: {
    '$v.form': 'touchFormValidations'
  },
  validations() {
    let validations = this.validations || {}

    if (!validations.hasOwnProperty('form')) {
      validations.form = {}
    }

    this.remoteErrors.forEach(element => {
      const resource = element.resource && element.resource.toLowerCase()
      const field = element.field
      const isFieldValidationError = resource && field

      if (isFieldValidationError) {
        const fieldPresentInComponent = has(this, [resource, field])

        let scopedValidationName = defaultValidations.includes(element.code)
          ? element.code
          : this.scopedValidationName([resource, field, element.code])

        if (fieldPresentInComponent) {
          const validationExistsInComponent = !has(validations, [
            resource,
            field,
            element.code
          ])

          if (validationExistsInComponent) {
            this.setValidation(
              validations[resource][element.field],
              scopedValidationName,
              element
            )
          }
        } else {
          this.setValidation(
            validations.form[element.field],
            scopedValidationName,
            element
          )
        }
      } else {
        this.setValidation(validations.form, element.type, element)
      }
    })
    return validations
  },
  methods: {
    setValidation(scope, validation, element) {
      this.setValidationMessage(validation, element.message)
      Vue.set(scope, validation, function() {
        return this.inErrorsArray(element)
      })
    },
    setValidationMessage(name, message) {
      if (!defaultValidations.includes(name)) {
        this.validationMessages[name] = message
      }
    },
    scopedValidationName(array) {
      return array.join('_')
    },
    inErrorsArray(element) {
      return !this.remoteErrors.find(error => error === element)
    },
    touchFormValidations() {
      this.$v.form.$touch()
    }
  }
}
