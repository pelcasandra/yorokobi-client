<template>
  <router-link
    :to="{ name: 'agent', params: { id: agent.id } }"
    class="agent-item bg-white first-child:rounded-t last-child:rounded-b last-child:border-b-0 w-64 p-5 border-b-2 font-medium hover:bg-indigo-100 focus:bg-indigo-200 block"
  >
    <div>
      <h4>{{ agent.hostname || agent.ip_address || 'Unnamed' }}</h4>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'AgentItem',
  props: {
    agent: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>
