const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack');
module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:10088'
        , changeOrigin: true
        , secure: true
      }
    }
  }
  , configureWebpack: {
    plugins:[
      new webpack.ProvidePlugin({
        'window.Quill': 'quill/dist/quill.js'
      })
    ]
  }
}
