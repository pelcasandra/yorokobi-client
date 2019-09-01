<template>
  <section class="flex-grow m-10 flex flex-col items-center">
    <h1 class="mt-5 mb-8 text-2xl font-medium text-center">
      Everything is up to date.
    </h1>
    <template v-if="stashes">
      <div class="rounded overflow-hidden shadow-md lg:w-1/2 w-4/5">
        <StashItem
          v-for="stash in stashes"
          :key="stash.id"
          :path="stash.path"
          :stash="stash"
        ></StashItem>
      </div>
    </template>
    <base-spinner v-else />
    <button
      class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-64 mt-8"
    >
      Add a new agent
    </button>
  </section>
</template>

<script>
import StashItem from '@/components/StashItem'

export default {
  components: { StashItem },
  props: ['workspace'],
  metaInfo() {
    return {
      title: this.workspace.name
    }
  },
  mounted() {
    this.fetchStashes()
  },
  computed: {
    stashes() {
      return this.$store.getters.getStashes(this.workspace.id)
    }
  },
  methods: {
    fetchStashes() {
      this.$store.dispatch('fetchStashes', this.workspace.id)
    }
  }
}
</script>
