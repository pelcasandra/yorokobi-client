<template>
  <router-link
    class="bg-white first-child:rounded-t last-child:rounded-b last-child:border-b-0 workspace-item w-64 p-5 border-b-2 font-medium hover:bg-indigo-100 focus:bg-indigo-200 block"
    :to="{ name: 'workspace', params: { handle: workspace.handle } }"
  >
    <h4>{{ workspace.name }}</h4>
  </router-link>
</template>

<script>
export default {
  name: 'WorkspaceItem',
  props: {
    count: {
      type: Number
    },
    index_count: {
      type: Number
    },
    workspace: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>
