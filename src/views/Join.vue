<template>
  <SignForm>
    <template v-slot:header>
      <h1 class="text-3xl font-bold">
        Get started now with a 30-day free trial.
      </h1>
      <p class="mb-6 mt-2">It takes a minute a join.</p>
    </template>
    <form
      @submit.prevent="register"
      class="bg-white shadow-md rounded px-10 pt-6 pb-8 mb-4"
    >
      <div class="mb-4">
        <label for="name" class="block text-gray-700 text-sm font mb-2"
          >Name:</label
        >
        <input
          v-model="name"
          type="text"
          name="name"
          placeholder="John Smith"
          value
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
        />
      </div>

      <div class="mb-4">
        <label for="email" class="block text-gray-700 text-sm font mb-2"
          >Email:</label
        >
        <input
          v-model="email"
          type="email"
          name="email"
          placeholder="john@yorokobi.com"
          value
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
        />
      </div>

      <div class="mb-4">
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
        Register
      </button>
      <p class="mt-6 text-sm">
        I agree to the Yorokobi Terms of Use and Privacy Policy.
      </p>
    </form>
    <template v-slot:footer>
      Already have an account?
      <strong>
        <router-link :to="{ name: 'sign' }">Login</router-link>
      </strong>
    </template>
  </SignForm>
</template>

<script>
import SignForm from '@/components/SignForm'

export default {
  components: { SignForm },
  data() {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    register() {
      this.$store
        .dispatch('register', {
          name: this.name,
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$router.push({ name: 'dashboard' })
        })
    }
  }
}
</script>
