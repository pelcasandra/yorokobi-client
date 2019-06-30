<template>
  <div class="flex w-full">
    <NavSettings/>
    <section class="flex-grow flex flex-col items-center">
      <h1 class="mt-5 mb-8 text-2xl font-medium text-center">Settings / General</h1>
      <form
        v-if="currentWorkspace"
        class="bg-white shadow-md rounded mb-4 lg:w-2/3 w-4/5"
        @submit.prevent="updateWorkspace"
      >
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
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded rounded-l-none w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white"
              @blur="$v.workspace.handle.$touch()"
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
                !$v.workspace.handle.parametizable &&
                  $v.workspace.handle.required
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
      <div v-else>
        <p>Loading...</p>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
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
      this.workspace = this._.clone(this.currentWorkspace)
    },
    updateWorkspace() {
      this.$v.workspace.$touch()
      if (!this.$v.workspace.$invalid) {
        this.$store
          .dispatch('updateWorkspace', {
            id: this.workspace.id,
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
    }
  }
}
</script>
