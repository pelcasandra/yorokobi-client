<template>
  <SignForm>
    <template v-slot:header>
      <h1 class="text-2xl mb-6 font-medium">Sign In</h1>
    </template>
    <form
      @submit.prevent="login"
      class="bg-white shadow-md rounded px-10 pt-6 pb-8 mb-4"
    >
      <div class="mb-4">
        <label for="email" class="block text-gray-700 text-sm font mb-2"
          >Email:</label
        >
        <input
          v-model="email"
          type="email"
          name="email"
          placeholder="martin@yorokobi.com"
          value
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
        />
      </div>

      <div class="mb-5">
        <label for="password" class="block text-gray-700 text-sm font mb-2"
          >Password:</label
        >

        <input
          v-model="password"
          type="password"
          name="password"
          placeholder="************"
          value
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
        />
      </div>

      <button
        type="submit"
        name="button"
        class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
      >
        Login
      </button>
    </form>
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
export default {
  components: { SignForm },
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login() {
      this.$store
        .dispatch('login', {
          user: {
            email: this.email,
            password: this.password
          }
        })
        .then(() => {
          this.$router.push({ name: 'workspaces' })
        })
    }
  }
}
</script>
