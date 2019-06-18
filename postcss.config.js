module.exports = {
  plugins: [require('tailwindcss'), require('autoprefixer')],
  configureWebpack: {
    devServer: {
      clientLogLevel: 'info',
      watchOptions: {
        poll: true
      }
    }
  }
}
