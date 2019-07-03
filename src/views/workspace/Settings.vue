<template>
  <div class="flex w-full">
    <NavSettings/>
    <section class="flex-grow flex flex-col items-center">
      <h1 class="mt-5 mb-8 text-2xl font-medium text-center">Settings / General</h1>
      <form-wrapper
        :validator="$v.workspace"
        :messages="localMessages"
        class="bg-white shadow-md rounded mb-4 lg:w-2/3 w-4/5"
        v-if="currentWorkspace"
      >
        <form @submit.prevent="updateWorkspace">
          <form-group name="name" label="Workspace Name">
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
          >
            <base-input-group left-text="yorokobi.com/">
              <base-input
                name="handle"
                v-model.trim="workspace.handle"
                placeholder="workspace"
                @blur="$v.workspace.handle.$touch()"
                :validation="$v.workspace.handle"
              />
            </base-input-group>
          </form-group>
          <div class="p-6 block">
            <button
              type="submit"
              name="button"
              class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-64"
            >Save Changes</button>
          </div>
        </form>
      </form-wrapper>
      <div v-else>
        <p>Loading...</p>
      </div>
    </section>
  </div>
</template>

<script>
import NavSettings from '@/components/NavSettings'
import Workspace from '@/mixins/Workspace.js'
import WorkspaceForm from '@/mixins/WorkspaceForm.js'

export default {
  components: { NavSettings },
  props: ['handle'],
  mixins: [Workspace, WorkspaceForm],
  watch: {
    currentWorkspace: {
      immediate: true,
      handler: 'cloneWorkspace'
    }
  },
  methods: {
    cloneWorkspace() {
      if (this.currentWorkspace) {
        this.workspace = this._.clone(this.currentWorkspace)
      }
    },
    updateWorkspace() {
      return this.dispatchWorkspace('updateWorkspace')
    }
  }
}
</script>
