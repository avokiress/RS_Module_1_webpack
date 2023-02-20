const { merge } = require('webpack-merge');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const commonConfig = require('./webpack.config.common')


module.exports = merge(
  commonConfig, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    openAnalyzer: false,
    rportFilename: 'reeport.html',
  })],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(), 
      new TerserPlugin(),
    ],
    splitChunks: { //Chunks — это в итоги файлы js которые получаются в результате работы webpack
      cacheGroups: {
        default: false, // перетераем значения
        vendors: false, // удаляем настройки по умолчанию
        vendor: { // описываем что webpack должен сделать
          chunks: 'all',
          name: 'vendor',
          test: /node_modules/ // не хотим чтобы это работало с папокй /node_modules/
        }
      }
    }
  },
});