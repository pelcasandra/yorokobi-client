<template>
  <SignForm>
    <template v-slot:header>
      <h1 class="text-3xl font-bold">Get started now.</h1>
      <p class="mb-6 mt-2">It takes a minute a join.</p>
    </template>
    <form-wrapper :validator="$v.user" :messages="validationMessages">
      <form-request-errors
        v-if="!$v.user.$invalid"
        :errors="requestErrors"
        class="rounded-b-none"
      />
      <form
        @submit.prevent="register"
        class="bg-white shadow-md rounded px-10 pt-6 pb-8 mb-4"
        :class="{ 'rounded-t-none': anyErrors }"
      >
        <form-group
          name="full_name"
          label="Full Name"
          class="mb-5"
          attribute="full name"
        >
          <base-input
            v-model.trim="user.full_name"
            name="full_name"
            placeholder="John Smith"
            :validation="$v.user.full_name"
          />
        </form-group>
        <form-group name="email" label="Email" class="mb-5">
          <base-input
            v-model.trim="user.email"
            name="name"
            type="email"
            placeholder="john@yorokobi.com"
            :validation="$v.user.email"
          />
        </form-group>
        <form-group name="password" label="Choose a Password" class="mb-5">
          <base-input
            v-model.trim="user.password"
            name="password"
            type="password"
            autocomplete="new-password"
            placeholder="••••••••"
            :validation="$v.user.password"
          />
        </form-group>
        <form-group
          name="password_confirmation"
          label="Repeat Password"
          class="mb-6"
        >
          <base-input
            v-model.trim="user.password_confirmation"
            name="password_confirmation"
            type="password"
            placeholder="••••••••"
            :validation="$v.user.password_confirmation"
          />
        </form-group>
        <base-button class="w-full" :loading="state.waitingRemoteResponse"
          >Register</base-button
        >
        <p class="mt-6 text-sm">
          I agree to the Yorokobi Terms of Use and Privacy Policy.
        </p>
      </form>
    </form-wrapper>
    <template v-slot:footer>
      Already have an account?
      <strong>
        <router-link :to="{ name: 'sign' }">Login</router-link>
      </strong>
    </template>
  </SignForm>
</template>

<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
import SignForm from '@/components/SignForm'
import RemoteValidation from '@/mixins/RemoteValidation'
import has from 'lodash/has'

export default {
  components: { SignForm },
  mixins: [RemoteValidation],
  metaInfo: {
    title: 'Join'
  },
  data() {
    return {
      user: {
        full_name: null,
        email: null,
        password: null,
        password_confirmation: null
      },
      validationMessages: {
        taken: 'This email is already in use.',
        required: 'Please enter your {attribute}.'
      }
    }
  },
  methods: {
    register() {
      this.$v.user.$touch()
      if (!this.$v.user.$invalid) {
        this.state.waitingRemoteResponse = true
        this.$store
          .dispatch('register', { user: this.user })
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
        required,
        email,
        taken() {
          return !this.hasRequestErrors('email', 'taken')
        }
      },
      full_name: { required },
      password: { newRequired: required, minLength: minLength(6) },
      password_confirmation: {
        sameAsPassword: sameAs('password'),
        minLength: minLength(6)
      }
    }
  }
}
</script>
