const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const CWD = process.cwd()
const APP_ENTRY_FILEPATH = path.resolve(CWD, 'src/index.js')
const BUILD_OUTPUT_DIR = path.resolve(CWD, 'build')

const buildConfig = {
  entry: APP_ENTRY_FILEPATH,
  output: {
    path: BUILD_OUTPUT_DIR,
    filename: 'index.js',
    library: 'index',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: true,
          },
        },
      },
    ],
  },
  externals: ['aws-sdk'],
  target: 'node',
  optimization: {
    minimize: false,
    concatenateModules: false,
  },
  devtool: 'eval',
  plugins: [new CleanWebpackPlugin()],
  stats: {
    warnings: false,
  },
}

// Use npm_lifecycle_event which is assigned the name of the executing npm script.
module.exports = buildConfig
