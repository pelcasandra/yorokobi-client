<template>
  <div class="w-full">
    <Header v-if="backup">
      Backups
      <span class="text-gray-500">/</span>
      {{ backup.stash }}
      <span class="text-gray-500">/</span>
      #{{ backup.number }}
    </Header>
    <section class="flex-grow m-10 flex flex-col items-center">
      <div
        v-if="backupReady && agentReady"
        class="bg-white lg:w-1/2 w-4/5 rounded overflow-hidden mb-8 shadow-md border-black-700"
      >
        <div class="border-b-2 p-5">
          <h1 class="text-xl font-bold">{{ backup.stash }}</h1>
        </div>
        <div class="border-b-2 p-5" v-if="complete">
          This backup completed successfuly.
          <Timeago :datetime="backup.completed_at">Completed</Timeago>
        </div>
        <div class="border-b-2 p-5" v-else-if="canceled">
          This backup was cancelled.
          <Timeago :datetime="backup.canceled_at">Canceled</Timeago>
        </div>
        <div class="border-b-2 p-5" v-else>
          Backup process initiated.
          <Timeago :datetime="backup.created_at">Initiated</Timeago>
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
      <base-spinner v-else />
      <div
        v-if="backupReady && agentReady"
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
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Header from '@/components/Header'
import NotFound from '@/views/errors/NotFound'
import Timeago from '@/components/Timeago'

export default {
  components: { Header, Timeago },
  props: ['id'],
  metaInfo() {
    return {
      title: this.backup ? this.title : 'Loading'
    }
  },
  created() {
    this.fetchBackup()
  },
  computed: {
    agent() {
      return this.$store.getters.getAgent(this.backup.agent)
    },
    backup() {
      return this.$store.getters.getBackup(this.id)
    },
    canceled: backup => backup.state === 'canceled',
    complete: backup => backup.state === 'completed',
    title() {
      return `Backup #${this.backup.number} - ${this.backup.workspace}/${
        this.backup.stash
      }`
    },
    ...mapState({
      backupReady: state => !state.backup.isLoading,
      agentReady: state => !state.agent.isLoading
    })
  },
  methods: {
    downloadLink() {
      window.location.href = this.backup.download_link
    },
    fetchBackup() {
      this.$store
        .dispatch('fetchBackup', this.id)
        .then(() => {
          this.fetchAgent()
          this.$meta().refresh()
        })
        .catch(() => this.$_error(NotFound))
    },
    fetchAgent() {
      this.$store.dispatch('fetchAgent', this.backup.agent)
    }
  }
}
</script>
