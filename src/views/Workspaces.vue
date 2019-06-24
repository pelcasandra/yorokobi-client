<template>
  <div class="m-auto p-8 h-full">
    <div class="flex flex-col items-center">
      <h1 class="text-3xl font-bold mb-8 text-gray-900">Workspaces</h1>
      <template v-if="!workspace.isLoading">
        <div class="rounded shadow-md">
          <WorkspaceItem
            v-for="workspace in workspace.workspaces"
            :key="workspace.id"
            :workspace="workspace"
          ></WorkspaceItem>
        </div>
      </template>
      <p v-else>Loading workspaces</p>
      <router-link
        :to="{ name: 'new_workspace' }"
        class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-64 mt-8 text-center"
        >New Workspace</router-link
      >
    </div>
  </div>
</template>

<script>
import FlexCenter from '@/mixins/FlexCenter.js'
import WorkspaceItem from '@/components/WorkspaceItem'
import { mapState } from 'vuex'

export default {
  components: { WorkspaceItem },
  mixins: [FlexCenter],
  mounted() {
    if (!this.$store.state.workspace.alreadyFetched) {
      this.$store.dispatch('fetchWorkspaces')
    }
  },
  computed: mapState(['workspace'])
}
</script>
