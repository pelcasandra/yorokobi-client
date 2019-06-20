<template>
  <div class="flex w-full">
    <NavSettings />
    <section class="flex-grow flex flex-col items-center">
      <h1 class="mt-5 mb-8 text-2xl font-medium text-center">
        Settings / General
      </h1>
      <form class="bg-white shadow-md rounded mb-4 lg:w-2/3 w-4/5">
        <div class="p-6 border-b-2 border-black-700 block">
          <label
            for="workspace_name"
            class="block text-gray-700 text-sm mb-2 font-medium"
            >Workspace Name</label
          >
          <input
            v-model="email"
            type="input"
            name="workspace_name"
            placeholder="Your Workspace"
            value
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
          />
        </div>
        <div class="p-6 border-b-2 border-black-700 block">
          <label
            for="workspace_handle"
            class="block text-gray-700 text-sm mb-2 font-medium"
            >Workspace URL</label
          >
          <input
            v-model="email"
            type="input"
            name="workspace_name"
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
    </section>
  </div>
</template>

<script>
import Nav from '@/components/Nav'
import NavSettings from '@/components/NavSettings'

export default {
  components: { Nav, NavSettings },
  props: ['handle']
}
</script>
