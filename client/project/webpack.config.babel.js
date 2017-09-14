// @flow
import path from 'path'

function resolve(glob: string) {
  return path.resolve(__dirname, '..', glob)
}

export default {
  target: 'web',
  bail: true,
  node: { fs: 'empty' },
  entry: { main: resolve('./src/boot.js') },
  output: {
    path: resolve('./build'),
    publicPath: '/',
    filename: 'bundle.js',
    libraryTarget: 'umd',
  },
  module: {
    loaders: [
      {
        test: /\.ejs/,
        loader: 'ejs-compiled-loader',
        query: {},
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [ resolve('src') ],
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
    ],
  },

  devServer: {
    publicPath: '/',
    filename: 'bundle.js',
    historyApiFallback: true,
    hot: true,
    contentBase: './build',
    colors: true,
    stats: {
      cached: false,
      cachedAssets: false,
      colors: { level: 2, hasBasic: true, has256: true, has16m: false },
    },
    disableHostCheck: true,
  },
}
