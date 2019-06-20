<template>
  <div class="m-auto p-8 h-full">
    <h1 class="text-3xl font-bold mb-8">Create a new Workspace</h1>
    <form
      class="bg-white shadow-md rounded mb-4"
      @submit.prevent="createWorkspace"
    >
      <div class="p-6 border-b-2 border-black-700 block">
        <label for="name" class="block text-gray-700 text-sm mb-2 font-medium"
          >Workspace Name</label
        >
        <input
          v-model="name"
          type="input"
          name="name"
          placeholder="Your Workspace"
          value
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
        />
      </div>
      <div class="p-6 border-b-2 border-black-700 block">
        <label for="handle" class="block text-gray-700 text-sm mb-2 font-medium"
          >Workspace URL</label
        >
        <input
          v-model="handle"
          type="input"
          name="handle"
          placeholder="Your Workspace"
          value
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
        />
      </div>
      <div class="p-6 block">
        <button
          type="submit"
          name="button"
          class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-64"
        >
          Save Changes
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import FlexCenter from '@/mixins/FlexCenter.js'
import Vue from 'vue'

export default {
  mixins: [FlexCenter],
  data() {
    return {
      name: '',
      handle: ''
    }
  },
  methods: {
    createWorkspace() {
      this.$store
        .dispatch('createWorkspace', {
          name: this.name,
          handle: this.handle
        })
        .then(() =>
          this.$router.push({
            name: 'workspace',
            params: { handle: this.handle }
          })
        )
    }
  }
}
</script>
