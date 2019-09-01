<template>
  <section class="flex-grow flex flex-col items-center">
    <h1 class="my-8 text-2xl font-bold text-center">Invoices</h1>
    <div
      v-if="invoices"
      class="rounded shadow-md lg:w-2/3 w-4/5 bg-white text-gray-800"
    >
      <template v-if="invoices.length">
        <InvoiceItem
          v-for="invoice in invoices"
          :key="invoice.id"
          :invoice="invoice"
        ></InvoiceItem>
      </template>
      <div v-else class="p-6">You don't have any invoices yet.</div>
    </div>
    <base-spinner v-else />
  </section>
</template>

<script>
import InvoiceItem from '@/components/InvoiceItem'

export default {
  props: ['workspace'],
  components: { InvoiceItem },
  watch: {
    workspace: {
      immediate: true,
      handler: 'fetchInvoices'
    }
  },
  computed: {
    invoices() {
      return this.$store.getters.getInvoices(this.workspace.id)
    }
  },
  methods: {
    fetchInvoices() {
      this.$store.dispatch('fetchInvoices', this.workspace.id)
    }
  }
}
</script>
