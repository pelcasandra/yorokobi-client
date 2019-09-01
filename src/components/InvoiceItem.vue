<template>
  <router-link
    class="bg-white first-child:rounded-t last-child:rounded-b last-child:border-b-0 workspace-item p-5 border-b-2 hover:bg-indigo-100 focus:bg-indigo-200 block flex"
    :to="{ name: 'invoice', params: { id: invoice.id } }"
  >
    <div class="mr-auto">
      {{ invoice.period_start_at | moment('LL') }} to
      {{ invoice.period_end_at | moment('LL') }}
    </div>
    <div class="align-right">{{ invoice.amount | money }}</div>
  </router-link>
</template>

<script>
import Money from '@/mixins/Money'

export default {
  props: {
    invoice: {
      type: Object
    }
  },
  mixins: [Money]
}
</script>
