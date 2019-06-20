<template>
  <div class="w-full">
    <Header v-if="!isLoading">
      Backups
      <span class="text-gray-500">/</span>
      {{ backup.stash }}
      <span class="text-gray-500">/</span>
      #{{ backup.number }}
    </Header>
    <section class="flex-grow m-10 flex flex-col items-center">
      <div
        v-if="!isLoading && !isLoadingAgent"
        class="bg-white lg:w-1/2 w-4/5 rounded overflow-hidden mb-8 shadow-md border-black-700"
      >
        <div class="border-b-2 p-5">
          <h1 class="text-xl font-bold">{{ backup.stash }}</h1>
        </div>
        <div class="border-b-2 p-5" v-if="isComplete">
          This backup completed successfuly.
          <Timeago :datetime="backup.completed_at">Completed</Timeago>
        </div>
        <div class="border-b-2 p-5" v-else-if="isCancel">
          This backup was cancelled.
          <Timeago :datetime="backup.canceled_at">Canceled</Timeago>
        </div>
        <div class="border-b-2 p-5" v-else>
          Backup process initiated.
          <Timeago :datetime="backup.created_at">Initiated</Timeago>
        </div>

        <div class="border-b-2 p-5">
          Run on
          <span class="font-medium">{{ agent.hostname }}</span
          >.
          <div class="text-gray-600 text-sm font mt-1">
            {{ agent.ip_address }}
          </div>
        </div>
      </div>

      <div
        v-if="!isLoading && !isLoadingAgent"
        class="bg-white lg:w-1/2 w-4/5 rounded overflow-hidden mb-8 shadow-md"
      >
        <div class="border-b-2 border-black-700 p-5">
          <h1 class="text-xl font-bold">Get this copy</h1>
        </div>
        <div class="border-b-2 p-5">
          <div
            class="break-all bg-gray-300 text-sm p-5"
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
import Nav from '@/components/Nav'
import NotFound from '@/views/errors/NotFound'
import Timeago from '@/components/Timeago'

export default {
  components: { Header, Nav, Timeago },
  props: ['datetime', 'handle', 'id'],
  created() {
    this.$store
      .dispatch('fetchBackup', this.id)
      .then(() => {
        this.$store.dispatch(
          'fetchAgent',
          this.$store.getters.getBackupById(this.id).agent
        )
      })
      .catch(() => this.$_error(NotFound))
  },
  computed: {
    isCancel: backup => backup.state === 'canceled',
    isComplete: backup => backup.state === 'completed',
    ...mapState({
      agent(state) {
        return state.agent.agents.find(agent => agent.id === this.backup.agent)
      },
      backup(state) {
        return state.backup.backups.find(backup => backup.id === this.id)
      },
      isLoading: state => state.backup.isLoading,
      isLoadingAgent: state => state.agent.isLoading
    })
  },
  methods: {
    downloadLink() {
      window.location.href = this.backup.download_link
    }
  }
}
</script>
