const webpack = require('webpack');
const path = require('path');
var autoprefixer = require('autoprefixer');
var os = require('os');
var ifaces = os.networkInterfaces();
var IP="localhost";
var port="2004";
// for(var it of ifaces.Ethernet){

//     if(it.family=="IPv4"){
//         IP=it.address;
//     }
// }
// if (!IP) {
//     throw new Error("IP not found");
// }
var host = IP+":"+port;

module.exports = [{
    //devtool: 'eval',
    mode: "development",
    entry: {
        devServerClient: 'webpack-dev-server/client?http://'+host,
        index: ['webpack/hot/only-dev-server', './src/start']
        // test: ['webpack/hot/only-dev-server', './src/test.js'],
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    output: {
        filename: 'assets/js/r/[name].js',
        path: path.join(__dirname, '/www'),
        publicPath: "http://"+host+"/",
    },
    devServer: {
        contentBase: path.join(__dirname, '/www'),
        host:IP,
        historyApiFallback: true,
        publicPath: "http://"+host+"/",
        port:port,
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/, // Match both .js and .jsx files
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [['env', { modules: false }], 'react', 'stage-0'],
                    plugins: [
                        'transform-decorators-legacy',
                        'transform-decorators',
                    ],
                },
            },
            {
                test: /\.less$/,
                // loader: 'style-loader!css-loader!less-loader?imagePath=~../m4-static/assets/',
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: { url: false },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                autoprefixer({
                                    browsers:['ie >= 8', 'last 4 version']
                                })
                            ],
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            imagePath: '~../www/assets/',
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
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
            },
        }),
    ],
}];
