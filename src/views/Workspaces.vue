<template>
  <div class="sign bg-indigo-200 h-screen">
    <div class="mx-auto h-full flex flex-col justify-center items-center">
      <h1 class="text-3xl font-bold mb-8">Workspaces</h1>
      <template v-if="!workspace.isLoading">
        <div class="rounded overflow-hidden shadow-md border-black-700">
          <WorkspaceItem
            v-for="workspace in workspace.workspaces"
            :key="workspace.id"
            :workspace="workspace"
          ></WorkspaceItem>
        </div>
      </template>
      <p v-else>Loading workspaces</p>
      <button
        class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-64 mt-8"
      >
        New Workspace
      </button>
    </div>
  </div>
</template>

<script>
import WorkspaceItem from '@/components/WorkspaceItem'
import { mapState } from 'vuex'

export default {
  components: { WorkspaceItem },
  computed: mapState(['workspace'])
}
</script>
