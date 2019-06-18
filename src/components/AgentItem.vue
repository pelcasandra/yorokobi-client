<template>
  <router-link :to="{ name: 'agent', params: { id: agent.id } }">
    <div
      class="agent-item bg-white w-64 p-5 border-b-2 border-black-700 font-medium hover:bg-indigo-100"
    >
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
