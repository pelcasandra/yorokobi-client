import { required } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      automaticHandle: true,
      requestErrors: [],
      workspace: {
        id: null,
        handle: null,
        name: null
      }
    }
  },
  watch: {
    handle: function() {
      this.removeRequestErrors('handle')
    }
  },
  methods: {
    removeRequestErrors(attribute) {
      if (this.hasRequestErrors(attribute)) {
        this._.remove(this.requestErrors, {
          field: attribute
        })
      }
    },
    disableAutomaticHandle() {
      if (this.automaticHandle) {
        this.automaticHandle = false
      }
    },
    getParameterizedHandle() {
      let parameterized_name = this.workspace.name
        .toLowerCase()
        .replace(/\s+|_/g, '-')
        .match(/[a-zA-Z0-9-]/g)
      if (parameterized_name) {
        return parameterized_name.join('')
      }
    },
    hasRequestErrors(attribute, code = null) {
      let errors = this._.filter(this.requestErrors, {
        field: attribute
      })

      if (code) {
        errors = this._.filter(errors, { code: code })
      }

      return !!errors.length
    }
  },
  validations: {
    workspace: {
      name: { required },
      handle: {
        required,
        parametizable(handle) {
          return /^[a-zA-Z0-9-]+$/.test(handle)
        },
        taken() {
          return !this.hasRequestErrors('handle', 'taken')
        }
      }
    }
  }
}
