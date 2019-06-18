<template>
  <router-link
    :to="{ name: 'workspace', params: { handle: workspace.handle } }"
  >
    <div
      class="workspace-item bg-white w-64 p-5 border-b-2 border-black-700 font-medium hover:bg-indigo-100 focus:bg-indigo-200"
    >
      <h4>{{ workspace.name }}</h4>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'WorkspaceItem',
  props: {
    workspace: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>
