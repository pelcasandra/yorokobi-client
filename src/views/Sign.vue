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
      <form
        @submit.prevent="login"
        class="bg-white shadow-md rounded px-10 pt-6 pb-8 mb-4"
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
      user: {
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
      this.$v.user.$touch()
      if (!this.$v.user.$invalid) {
        this.$store
          .dispatch('login', {
            user: this.user
          })
          .then(() => {
            this.$router.push({ name: 'workspaces' })
          })
      }
    }
  },
  validations: {
    user: {
      email: { email, required },
      password: { required, minLength: minLength(6) }
    }
  }
}
</script>
