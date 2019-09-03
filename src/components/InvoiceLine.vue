<template>
  <tr>
    <td class="text-left">{{ line.description }}</td>
    <td class="py-3 text-left">
      {{ line.start | moment('LL') }} - {{ line.end | moment('LL') }}
    </td>
    <td class="text-right">{{ line.amount | money }}</td>
  </tr>
</template>

<script>
import Money from '@/mixins/Money'

export default {
  props: ['line'],
  mixins: [Money]
}
</script>
