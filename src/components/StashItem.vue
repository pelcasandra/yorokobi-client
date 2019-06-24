<template>
  <router-link
    :to="{ name: 'stash', params: { id: stash.handle } }"
    class="stash-item bg-white first-child:rounded-t last-child:rounded-b last-child:border-b-0 p-5 border-b-2 font-medium hover:bg-indigo-100 focus:bg-indigo-200 block"
  >
    <div class>
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
