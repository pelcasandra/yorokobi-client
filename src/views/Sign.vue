<template>
  <SignForm>
    <template v-slot:header>
      <h1 class="text-2xl mb-6 font-medium">Sign In</h1>
    </template>
    <form-wrapper
      :validator="$v.user"
      :messages="validationMessages"
      class="w-full max-w-xs"
    >
      <form-request-errors
        :validator="$v.user"
        :errors="requestErrors"
        class="rounded-b-none"
      />
      <form
        @submit.prevent="login"
        class="bg-white shadow-md rounded px-10 pt-6 pb-8 mb-4"
        :class="{ 'rounded-t-none': anyError }"
        :validator="$v.user"
      >
        <form-group name="email" label="Email" class="mb-5">
          <base-input
            v-model.trim="user.email"
            name="email"
            type="email"
            placeholder="john@yorokobi.com"
            :validation="$v.user.email"
          />
        </form-group>
        <form-group name="password" label="Password" class="mb-6">
          <base-input
            v-model.trim="user.password"
            name="password"
            type="password"
            placeholder="••••••••"
            :validation="$v.user.password"
          />
        </form-group>
        <base-button class="w-full" :loading="state.waitingRemoteResponse"
          >Login</base-button
        >
      </form>
    </form-wrapper>
    <template v-slot:footer>
      <router-link :to="{ name: 'join' }">
        New to Yorokobi?
        <strong>Sign Up</strong>.
      </router-link>
    </template>
  </SignForm>
</template>

<script>
import SignForm from '@/components/SignForm'
import RemoteValidation from '@/mixins/RemoteValidation'
import { required, email, minLength } from 'vuelidate/lib/validators'
import has from 'lodash/has'

export default {
  components: { SignForm },
  mixins: [RemoteValidation],
  metaInfo: {
    title: 'Login'
  },
  data() {
    return {
      user: {
        email: null,
        password: null
      },
      validationMessages: {
        unauthorized: 'Invalid credentials'
      }
    }
  },
  methods: {
    login() {
      this.$v.user.$touch()
      if (!this.$v.user.$invalid) {
        this.state.waitingRemoteResponse = true
        this.$store
          .dispatch('login', {
            user: this.user
          })
          .then(() => {
            this.$router.push({ name: 'workspaces' })
          })
          .catch(error => {
            this.state.waitingRemoteResponse = false
            if (has(error, 'response.data.errors')) {
              this.requestErrors = error.response.data.errors
            }
          })
      }
    }
  },
  validations: {
    user: {
      email: {
        email,
        required
      },
      password: { required, minLength: minLength(6) }
    }
  }
}
</script>
