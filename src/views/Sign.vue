<template>
  <SignForm>
    <template v-slot:header>
      <h1 class="text-2xl mb-6 font-medium">Sign In</h1>
    </template>
    <form-wrapper
      :validator="$v.form"
      :messages="validationMessages"
      class="w-full max-w-xs"
    >
      <form
        @submit.prevent="login"
        class="bg-white shadow-md rounded px-10 pt-6 pb-8 mb-4"
        :validator="$v.form"
      >
        <form-group name="email" label="Email" class="mb-4">
          <template v-slot:label>
            <label for="email" class="block text-gray-700 text-sm font mb-2"
              >Email</label
            >
          </template>
          <base-input
            v-model.trim="form.email"
            name="email"
            type="email"
            placeholder="martin@yorokobi.com"
            :validation="$v.form.email"
            @blur="$v.form.email.$touch()"
          />
        </form-group>
        <form-group name="password" label="Password" class="mb-6">
          <template v-slot:label>
            <label for="password" class="block text-gray-700 text-sm font mb-2"
              >Password</label
            >
          </template>
          <base-input
            v-model.trim="form.password"
            name="password"
            type="password"
            placeholder="••••••••"
            :validation="$v.form.password"
            @blur="$v.form.password.$touch()"
          />
        </form-group>

        <button
          type="submit"
          name="button"
          class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Login
        </button>
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
import { required, email, minLength } from 'vuelidate/lib/validators'
import SignForm from '@/components/SignForm'

export default {
  components: { SignForm },
  data() {
    return {
      form: {
        email: null,
        password: null
      },
      validationMessages: {
        required: 'Please enter your {attribute}.'
      }
    }
  },
  methods: {
    login() {
      this.$v.form.$touch()
      if (!this.$v.form.$invalid) {
        this.$store
          .dispatch('login', {
            user: {
              email: this.form.email,
              password: this.form.password
            }
          })
          .then(() => {
            this.$router.push({ name: 'workspaces' })
          })
      }
    }
  },
  validations: {
    form: {
      email: { email, required },
      password: { required, minLength: minLength(6) }
    }
  }
}
</script>
