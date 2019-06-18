<template>
  <router-link :to="{ name: 'stash', params: { id: stash.handle } }">
    <div
      class="stash-item bg-white p-5 border-b-2 border-black-700 font-medium hover:bg-indigo-100"
    >
      <h4>{{ stash.name }}</h4>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'StashItem',
  props: {
    stash: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>
