module.exports = {
  theme: {
    fontSmoothing: true,
    extend: {
      backgroundColor: theme => ({
        default: 'rgb(238, 243, 239)'
      }),
      colors: {
        cornsilk: 'Cornsilk',
        primary: 'SeaGreen'
      }
    }
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
