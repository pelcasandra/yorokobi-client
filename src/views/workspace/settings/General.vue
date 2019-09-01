<template>
  <section class="flex-grow flex flex-col items-center">
    <h1 class="my-8 text-2xl font-bold text-center">General Settings</h1>
    <form-request-errors
      :validator="$v.form"
      :errors="requestErrors"
      class="lg:w-2/3 w-4/5"
    />
    <form-wrapper
      :validator="$v.form"
      :messages="localMessages"
      class="bg-white shadow-md rounded mb-4 lg:w-2/3 w-4/5"
      v-if="form"
    >
      <form @submit.prevent="updateWorkspace">
        <form-group name="name" label="Workspace Name" class="p-6 border-b-2">
          <base-input
            name="name"
            v-model.trim="form.name"
            placeholder="Your Workspace"
            @blur="$v.form.name.$touch()"
            :validation="$v.form.name"
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
              v-model.trim="form.handle"
              placeholder="workspace"
              @blur="$v.form.handle.$touch()"
              :validation="$v.form.handle"
            />
          </base-input-group>
        </form-group>
        <div class="p-6 block">
          <base-button class="w-64" :loading="state.waitingRemoteResponse"
            >Save Changes</base-button
          >
        </div>
      </form>
    </form-wrapper>
    <base-spinner v-else />
  </section>
</template>

<script>
import WorkspaceForm from '@/mixins/WorkspaceForm.js'
import clone from 'lodash/clone'

export default {
  props: ['handle', 'workspace'],
  mixins: [WorkspaceForm],
  metaInfo() {
    return {
      title: this.workspace.name
    }
  },
  created() {
    this.cloneWorkspace()
  },
  methods: {
    cloneWorkspace() {
      this.form = clone(this.workspace)
    },
    updateWorkspace() {
      return this.dispatchWorkspace('updateWorkspace')
    }
  }
}
</script>
