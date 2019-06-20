export default {
  mounted() {
    document.documentElement.classList.add('h-full'),
      document.body.classList.add(
        'bg-indigo-200',
        'flex',
        'flex-col',
        'min-h-full'
      )
  },
  destroyed() {
    document.documentElement.classList.remove('h-full'),
      document.body.classList.remove(
        'bg-indigo-200',
        'flex',
        'flex-col',
        'min-h-full'
      )
  }
}
