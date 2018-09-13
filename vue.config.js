const { resolve } = require('path')
const { EnvironmentPlugin } = require('webpack')
const { ProvidePlugin } = require('webpack')
const { BaseHrefWebpackPlugin } = require('base-href-webpack-plugin')

module.exports = {
  baseUrl: './',
  configureWebpack: {
    devtool: 'source-map',
    devServer: {
      host: '0.0.0.0',
      allowedHosts: ['.herokuapp.com']
    },
    resolve: {
      extensions: ['.vue', '.js', '.jsx', '.json'],
      alias: { '@': resolve(__dirname, 'src') }
    },
    plugins: [
      new BaseHrefWebpackPlugin({
        baseHref: process.env['ASSET_PATH']
      }),
      new EnvironmentPlugin({
        'DATABASE_URL': 'http://localhost:5984'
      }),
      new ProvidePlugin({
        'window.Quill': 'quill',
        // 'Quill': 'quill'
      })
    ]
  }
}
