<template>
  <div class="flex w-full">
    <NavSettings/>
    <section class="flex-grow flex flex-col items-center">
      <h1 class="mt-5 mb-8 text-2xl font-medium text-center">Settings / General</h1>
      <form class="bg-white shadow-md rounded mb-4 lg:w-2/3 w-4/5">
        <div class="p-6 border-b-2 block">
          <label for="name" class="block text-gray-700 text-sm mb-2 font-bold">Workspace Name</label>
          <input
            v-model="name"
            type="input"
            name="name"
            placeholder="Your Workspace"
            value
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
          >
        </div>
        <div class="p-6 border-b-2 block">
          <label for="handle" class="block text-gray-700 text-sm mb-2 font-bold">Workspace URL</label>
          <div class="flex flex-row">
            <span
              class="flex items-center bg-gray-200 rounded rounded-r-none px-3 font-medium text-gray-700"
            >yorokobi.com/</span>
            <input
              v-model="handle"
              type="input"
              name="handle"
              placeholder="workspace"
              value
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded rounded-l-none w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
            >
          </div>
          <div class="text-sm mt-3 text-gray-700">
            Your workplace is accessible only by you and the people from your
            team you decided to give access to.
          </div>
        </div>
        <div class="p-6 block">
          <button
            type="submit"
            name="button"
            class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-64"
          >Save Changes</button>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import NavSettings from '@/components/NavSettings'

export default {
  components: { NavSettings },
  props: ['handle']
}
</script>
