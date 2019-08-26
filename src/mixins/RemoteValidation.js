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
  computed: {
    anyErrors() {
      return this.requestErrors.length
    }
  },
  methods: {
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
