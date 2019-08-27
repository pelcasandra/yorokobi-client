import FormRequestErrors from '@/components/FormRequestErrors'
import filter from 'lodash/filter'

export default {
  components: { FormRequestErrors },
  data() {
    return {
      requestErrors: [],
      state: {
        waitingRemoteResponse: false
      }
    }
  },
  watch: {
    requestErrors: 'scrollToError'
  },
  computed: {
    anyError() {
      return !!this.requestErrors.length
    },
    localValidator() {
      return this.$v
    },
    noLocalValidator() {
      return !this.localValidator
    },
    validLocally() {
      return !!this.$v && !this.$v.$invalid
    }
  },
  methods: {
    scrollToError() {
      if (this.validaLocally || this.noLocalValidator) {
        this.$scrollTo('body')
      }
    },
    hasRequestErrors(attribute, code = null) {
      let errors = filter(this.requestErrors, {
        field: attribute
      })

      if (code) {
        errors = filter(errors, { code: code })
      }

      return !!errors.length
    }
  }
}
