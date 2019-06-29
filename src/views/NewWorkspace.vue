<template>
  <div class="new-workspace m-auto p-8 h-full w-full">
    <h1 class="text-3xl font-bold mb-8 text-center text-gray-900">Create a new Workspace</h1>
    <form class="bg-white shadow-md rounded mb-4" @submit.prevent="createWorkspace">
      <div class="p-6 border-b-2 block">
        <BaseInput
          label="Workspace Name"
          v-model.trim="workspace.name"
          placeholder="Your Workspace"
          name="name"
          type="text"
          @blur="$v.workspace.name.$touch()"
          :validation="$v.workspace.name"
        />
        <div v-if="$v.workspace.name.$error" class="text-sm mt-2 font-medium text-red-600">
          <p v-if="!$v.workspace.name.required">Please enter a name for your workspace.</p>
        </div>
      </div>
      <div class="p-6 border-b-2 block">
        <label for="handle" class="block text-gray-700 text-sm mb-2 font-bold">Workspace URL</label>
        <div class="flex flex-row">
          <span
            class="flex items-center bg-gray-200 rounded rounded-r-none px-3 font-medium text-gray-700"
          >yorokobi.com/</span>
          <input
            v-model.trim="workspace.handle"
            type="input"
            name="handle"
            placeholder="workspace"
            @keyup="disableAutomaticHandle"
            @blur="$v.workspace.handle.$touch()"
            value
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded rounded-l-none w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white"
            :class="
              $v.workspace.handle.$error
                ? 'focus:bg-red-100 bg-red-100 border-red-600'
                : 'focus:border-indigo-500'
            "
          >
        </div>
        <div v-if="$v.workspace.handle.$error" class="text-sm mt-2 font-medium text-red-600">
          <p
            v-if="!$v.workspace.handle.required"
          >Please chose a unique handle name for your workspace.</p>
          <p
            v-if="
              !$v.workspace.handle.parametizable && $v.workspace.handle.required
            "
          >
            Your handle name should contain only letters, numbers and hyphens
            (-).
          </p>
          <p
            v-if="!$v.workspace.handle.taken"
          >The handle you chosen is already taken. Please choose another one.</p>
        </div>
        <div class="text-sm mt-3 text-gray-700">
          Your workplace is accessible only by you and the people from your team
          you decided to give access to.
        </div>
      </div>
      <div class="p-6 block text-center">
        <button
          type="submit"
          name="button"
          class="bg-indigo-500 text-lg hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-64"
        >Create new workspace</button>
        <span class="mx-3 text-gray-600">or</span>
        <router-link
          :to="{ name: 'workspaces' }"
          href="#"
          class="text-gray-600 underline font-medium"
        >Go back</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import FlexCenter from '@/mixins/FlexCenter.js'
import WorkspaceForm from '@/mixins/WorkspaceForm.js'

export default {
  mixins: [FlexCenter, WorkspaceForm],
  watch: {
    'workspace.name': 'generateAutomaticHandle'
  },
  methods: {
    createWorkspace() {
      this.$v.workspace.$touch()
      if (!this.$v.workspace.$invalid) {
        this.$store
          .dispatch('createWorkspace', {
            name: this.workspace.name,
            handle: this.workspace.handle
          })
          .then(() =>
            this.$router.push({
              name: 'workspace',
              params: { handle: this.workspace.handle }
            })
          )
          .catch(error => {
            if (error.response && error.response.status == 422) {
              this.requestErrors = error.response.data.errors
            }
          })
      }
    },
    generateAutomaticHandle() {
      if (this.automaticHandle) {
        this.workspace.handle = this.getParameterizedHandle()
      }
    }
  }
}
</script>

<style scoped>
.new-workspace {
  max-width: 640px;
}
</style>
