<template>
  <div class="new-workspace m-auto p-8 h-full w-full">
    <h1 class="text-3xl font-bold mb-8 text-center text-gray-900">
      Create a new Workspace
    </h1>
    <form-wrapper
      :validator="$v.workspace"
      :messages="localMessages"
      class="bg-white shadow-md rounded mb-4"
    >
      <form @submit.prevent="createWorkspace">
        <form-group name="name" label="Workspace Name" class="p-6 border-b-2">
          <base-input
            name="name"
            v-model.trim="workspace.name"
            placeholder="Your Workspace"
            @blur="$v.workspace.name.$touch()"
            :validation="$v.workspace.name"
          />
        </form-group>
        <form-group
          name="handle"
          label="Workspace URL"
          hint="Your workplace is accessible only by you and the people from your team you decided to give access to."
          class="p-6 border-b-2"
        >
          <base-input-group left-text="yorokobi.com/">
            <base-input
              name="handle"
              v-model.trim="workspace.handle"
              placeholder="workspace"
              @keyup="disableAutomaticHandle"
              @blur="$v.workspace.handle.$touch()"
              :validation="$v.workspace.handle"
            />
          </base-input-group>
        </form-group>
        <div class="p-6 block text-center">
          <button
            type="submit"
            name="button"
            class="bg-indigo-500 text-lg hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-64"
          >
            Create new workspace
          </button>
          <span class="mx-3 text-gray-600">or</span>
          <router-link
            :to="{ name: 'workspaces' }"
            href="#"
            class="text-gray-600 underline font-medium"
            >Go back</router-link
          >
        </div>
      </form>
    </form-wrapper>
  </div>
</template>

<script>
import FlexCenter from '@/mixins/FlexCenter.js'
import WorkspaceForm from '@/mixins/WorkspaceForm.js'

export default {
  mixins: [FlexCenter, WorkspaceForm],
  metaInfo() {
    return {
      title: 'New Workspace',
      titleTemplate: null
    }
  },
  watch: {
    'workspace.name': 'generateAutomaticHandle'
  },
  methods: {
    createWorkspace() {
      return this.dispatchWorkspace('createWorkspace')
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
