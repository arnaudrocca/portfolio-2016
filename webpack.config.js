const precss = require('precss');
const autoprefixer = require('autoprefixer');

module.exports = {
    entry: [
        './src/scripts/main.js',
        './src/styles/main.styl'
    ],
    output: {
        path: './static',
        filename: 'bundle.js',
        publicPath: '/'
    },
    node: {
        fs: 'empty'
    },
    devServer: {
        inline: true,
        contentBase: './static'
    },
    resolve: {
        modulesDirectories: ['node_modules'],
        root: '',
        alias: {
            TweenMax: __dirname + '/node_modules/gsap/src/uncompressed/TweenMax.js',
            scrollTo: __dirname + '/node_modules/gsap/src/uncompressed/plugins/ScrollToPlugin.js'
        }
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                query: {
                    presets: ['es2015'],
                    plugins: ['add-module-exports']
                }
            },
            {
                test: /\.styl$/,
                loader: 'style!css!postcss!stylus'
            },
            {
                test: /\.(otf|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                loader: 'file-loader'
            },
            {
                test: /\.json$/,
                loader: 'json'
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
