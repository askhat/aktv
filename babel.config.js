module.exports = {
  presets: [
    ['@vue/app', { useBuiltIns: 'entry' }]
  ],
  plugins: [
    ['transform-imports', {
      vuetify: {
        /* eslint no-template-curly-in-string: 'off' */
        transform: 'vuetify/es5/components/${member}',
        preventFullImport: true
      }
    }]
  ]
}
