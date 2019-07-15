import router from '@/router'
import Vue from 'vue'
import ErrorPage from 'vue-error-page'
import App from '@/App.vue'
import store from '@/store/store'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import VueTimeago from 'vue-timeago'
import Vuelidate from 'vuelidate'
import VueLodash from 'vue-lodash'
import VueMeta from 'vue-meta'
import FormGroup from '@/components/FormGroup'
import vuelidateErrorExtractor, { templates } from 'vuelidate-error-extractor'
import '@/assets/css/tailwind.css'

window.eventBus = new Vue()

Vue.use(ErrorPage)

Vue.use(VueTimeago, {
  name: 'Timeago',
  locale: 'en'
})

Vue.use(Vuelidate)
Vue.use(VueLodash)

Vue.use(VueMeta, {
  // refreshOnceOnNavigation: true
})

Vue.use(vuelidateErrorExtractor, {
  template: FormGroup,
  messages: {
    email: 'Please enter a valid email address.',
    required: 'Please enter the {attribute}.',
    minLength: 'Your {attribute} is too short.',
    newRequired: 'Please enter a new {attribute}.',
    sameAsPassword: "Password confirmation doesn't match password.",
    unauthorized: 'Invalid credentials. Please try again.'
  }
})

Vue.component('FormWrapper', templates.FormWrapper)

const requireComponent = require.context(
  // The relative path of the components folder
  './components',
  // Whether or not to look in subfolders
  false,
  // The regular expression used to match base component filenames
  /Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  // Get component config
  const componentConfig = requireComponent(fileName)

  // Get PascalCase name of component
  const componentName = upperFirst(
    camelCase(
      // Gets the file name regardless of folder depth
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )
  )

  // Register component globally
  Vue.component(
    componentName,
    // Look for the component options on `.default`, which will
    // exist if the component was exported with `export default`,
    // otherwise fall back to module's root.
    componentConfig.default || componentConfig
  )
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  VueTimeago,
  render: h => h(App),
  created() {
    if (this.$store.state.user.token) {
      Vue.axios.defaults.headers.common[
        'Authorization'
      ] = this.$store.state.user.token
    }
    //
    Vue.axios.interceptors.response.use(
      response => response
      // error => {
      //   if (error.response.status === 401) {
      //     this.$router.push('/')
      //     this.$store.dispatch('logout')
      //   }
      //   return Promise.reject(error)
      // }
    )
  },
  metaInfo: {
    titleTemplate: titleChunk => {
      return titleChunk ? `${titleChunk} - Yorokobi` : 'Yorokobi'
    }
  }
}).$mount('#app')
