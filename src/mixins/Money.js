export default {
  filters: {
    money: value => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
      }).format(value / 100)
    }
  }
}
