<template>
  <section class="flex-grow flex flex-col items-center">
    <h1 class="my-8 text-2xl font-bold text-center"></h1>
    <div class="bg-white rounded shadow-md lg:w-2/3 w-4/5 text-gray-800 p-6">
      <h1 class="text-2xl font-bold">Yorokobi, Inc.</h1>
      <div class="text-sm">2035 Sunset Lake Rd # B-2</div>
      <div class="text-sm">Newark, DE 19702</div>
      <div class="mt-8 text-sm font-medium">Customer</div>
      <div class="text-sm">{{ workspace.name }}</div>
      <table class="mt-8 w-full text-sm">
        <thead class="border-b-2 border-gray-300">
          <tr>
            <th class="pb-3 text-left font-medium">Description</th>
            <th class="pb-3 text-left font-medium">Period</th>
            <th class="pb-3 text-right font-medium">Amount</th>
          </tr>
        </thead>
        <tbody>
          <invoice-line
            v-for="line in invoice.invoice_lines"
            :key="line.id"
            :line="line"
          ></invoice-line>
        </tbody>
        <tfoot class="font-bold border-t-2 border-gray-300">
          <tr>
            <td class="pt-3">Total</td>
            <td></td>
            <td class="pt-3 text-right">{{ invoice.amount | money }}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  </section>
</template>

<script>
import InvoiceLine from '@/components/InvoiceLine'
import Money from '@/mixins/Money'

export default {
  props: ['id', 'workspace'],
  components: { InvoiceLine },
  mixins: [Money],
  computed: {
    invoice() {
      return this.$store.getters.getInvoice(this.id)
    }
  },
  mounted() {
    this.fetchInvoice()
  },
  methods: {
    fetchInvoice() {
      if (!this.invoice) {
        this.$store.dispatch('fetchInvoice', this.id)
      }
    }
  }
}
</script>
