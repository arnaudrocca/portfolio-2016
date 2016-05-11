var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var precss = require('precss');
var autoprefixer = require('autoprefixer');

module.exports = {
    entry: [
        './src/scripts/main.js',
        './src/styles/main.styl'
    ],
    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name]-[hash].min.js',
        publicPath: '/'
    },
    node: {
        fs: 'empty'
    },
    devServer: {
        inline: true,
        contentBase: './static',
        outputPath: path.join(__dirname, 'build')
    },
    resolve: {
        modulesDirectories: ['node_modules'],
        root: '',
        alias: {
            TweenMax: __dirname + '/node_modules/gsap/src/uncompressed/TweenMax.js',
            scrollTo: __dirname + '/node_modules/gsap/src/uncompressed/plugins/ScrollToPlugin.js'
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.tpl.html',
            inject: 'body',
            filename: 'index.html'
        }),
        new CopyWebpackPlugin(
            [{
                from: 'static'
            }],
            {
                ignore: ['.DS_Store', '.keep']
            }
        ),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true
                // pure_funcs: ['console.log']
            }
        }),
        new ExtractTextPlugin('[name]-[hash].min.css', { allChunks: true }),
        new CleanWebpackPlugin(['build'], { root: __dirname })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015'],
                    plugins: ['add-module-exports']
                }
            },
            {
                test: /\.styl$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract('style', 'css!postcss!stylus')
            },
            {
                test: /\.(otf|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                exclude: /node_modules/,
                loader: 'file-loader'
            }
        ]
    },
    postcss: function() {
        return [
            precss,
            autoprefixer({
                add: true,
                remove: true
            })
        ];
    }
};
