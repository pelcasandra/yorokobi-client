module.exports = {
  theme: {
    fontSmoothing: true
  },
  plugins: [
    function({ addVariant, e }) {
      addVariant('first-child', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`first-child${separator}${className}`)}:first-child`
        })
      }),
        addVariant('last-child', ({ modifySelectors, separator }) => {
          modifySelectors(({ className }) => {
            return `.${e(`last-child${separator}${className}`)}:last-child`
          })
        })
    }
  ],
  variants: {
    backgroundColor: [
      'responsive',
      'first-child',
      'last-child',
      'hover',
      'focus'
    ],
    borderRadius: ['first-child', 'last-child'],
    borderWidth: ['first-child', 'last-child']
  }
}
