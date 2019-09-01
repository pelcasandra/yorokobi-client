<template>
  <div class="w-full">
    <Header v-if="backup && stash">
      Backups
      <span class="text-gray-500">/</span>
      {{ stash.handle }}
      <span class="text-gray-500">/</span>
      #{{ backup.number }}
    </Header>
    <section class="flex-grow m-10 flex flex-col items-center" v-if="ready">
      <div
        class="bg-white lg:w-1/2 w-4/5 rounded overflow-hidden mb-8 shadow-md border-black-700"
      >
        <div class="border-b-2 p-5">
          <h1 class="text-xl font-bold">{{ stash.handle }}</h1>
        </div>
        <div class="border-b-2 p-5" v-if="complete">
          This backup completed successfuly.
          <Timeago :datetime="backup.completed">Completed</Timeago>
        </div>
        <div class="border-b-2 p-5" v-else-if="canceled">
          This backup was cancelled.
          <Timeago :datetime="backup.canceled">Canceled</Timeago>
        </div>
        <div class="border-b-2 p-5" v-else>
          Backup process initiated.
          <Timeago :datetime="backup.created">Initiated</Timeago>
        </div>

        <div class="border-b-2 p-5">
          Ran on
          <span class="font-medium">{{ agent.hostname }}</span
          >.
          <div class="text-gray-600 text-sm font mt-1">
            {{ agent.ip_address }}
          </div>
        </div>
      </div>
      <div
        class="bg-white lg:w-1/2 w-4/5 rounded overflow-hidden mb-8 shadow-md"
      >
        <div class="border-b-2 border-black-700 p-5">
          <h1 class="text-xl font-bold">Get a copy</h1>
        </div>
        <div class="border-b-2 p-5">
          <div
            class="break-all bg-gray-200 text-sm p-5"
            @focus="$event.target.select()"
          >
            {{ backup.download_link }}
          </div>
          <button
            @click="downloadLink()"
            class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-64 mt-8"
          >
            Get this copy
          </button>
        </div>
      </div>
    </section>
    <base-spinner v-else class="mt-6" />
  </div>
</template>

<script>
import Header from '@/components/Header'
import Timeago from '@/components/Timeago'
import NotFound from '@/views/errors/NotFound'

export default {
  components: { Header, Timeago },
  props: ['id'],
  metaInfo() {
    return {
      title: this.backup ? this.title : 'Loading'
    }
  },
  mounted() {
    this.fetchBackup()
  },
  computed: {
    agent() {
      return this.$store.getters.getAgent(this.backup.agent)
    },
    backup() {
      return this.$store.getters.getBackup(this.id)
    },
    stash() {
      return this.$store.getters.getStash(this.backup.stash)
    },
    ready() {
      return this.backup && this.agent && this.stash
    },
    title() {
      return `Backup #${this.backup.number} - ${this.backup.path}`
    },
    canceled: backup => backup.state === 'canceled',
    complete: backup => backup.state === 'completed'
  },
  methods: {
    fetchBackup() {
      this.$store
        .dispatch('fetchBackup', this.id)
        .then(() => {
          this.fetchAgent()
          this.fetchStash()
          this.$meta().refresh()
        })
        .catch(() => this.$_error(NotFound))
    },
    fetchAgent() {
      this.$store.dispatch('fetchAgent', this.backup.agent)
    },
    fetchStash() {
      this.$store.dispatch('fetchStash', this.backup.stash)
    },
    downloadLink() {
      window.location.href = this.backup.download_link
    }
  }
}
</script>
