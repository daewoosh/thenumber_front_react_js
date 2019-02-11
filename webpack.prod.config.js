const webpack = require('webpack');
const path = require('path');
var autoprefixer = require('autoprefixer');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
//const assetsPluginInstance = new AssetsPlugin();
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

var os = require('os');
var UglifyJsParallelPlugin = require('webpack-uglify-parallel');

// the path(s) that should be cleaned
let pathsToClean = [
  path.join(__dirname, '/www/assets/js/r/*.js'),
]

// the clean options to use
let cleanOptions = {
  verbose: true,
  dry: false
}

module.exports = [{
  //devtool: 'eval',
  mode: "production",
  entry: {
    index: './src/start.js'
  },
  output: {
    filename: 'assets/js/r/[name].[chunkhash].js',
    path: path.join(__dirname, '/www'),
    publicPath: './',
  },
  // watch: true,
  watchOptions: {
    poll: 3000,
    ignored: /node_modules/,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,         // Match both .js and .jsx files
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          cacheDirectory: true, // включить кэширование
          presets: [['env', { modules: false }], 'react', 'stage-0'],
          plugins: [
            'transform-react-remove-prop-types', // в продакте не проверяются пропсы их можно удалить
            'transform-decorators-legacy',
            'transform-decorators',
          ]
        },
      },
      {
        test: /\.less$/,
        //loader: 'style-loader!css-loader!less-loader?imagePath=~../m4-static/assets/',
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: { url: false, },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer({
                  browsers: ['ie >= 8', 'last 4 version']
                })
              ],
              sourceMap: true
            }
          },
          {
            loader: "less-loader",
            options: {
              imagePath: "~../www/assets/",
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        // loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      react$: path.resolve('./node_modules/react/'),
    },
    modules: [
      path.join(__dirname, 'src'),
      'node_modules',
    ],
  },
  plugins: [
    new CleanWebpackPlugin(pathsToClean, cleanOptions),
    new HtmlWebpackPlugin({
      template: './resources/index.template.ejs',
      excludeChunks: ['inviteInfo'],
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new UglifyJsParallelPlugin({
      workers: os.cpus().length,
      minimize: true,
      comments: false,
      parallel: true,
      compress: {
        warnings: false,
        drop_console: true,
      },
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru/),// загружаем только необходимые локали
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: path.resolve(__dirname, 'BundleAnalyzeReport.html'),
      openAnalyzer: false,
      generateStatsFile: false,
    }),
  ],
}];
