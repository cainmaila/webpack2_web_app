var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';
console.info('process.env.NODE_ENV=', process.env.NODE_ENV);
var entryMain = ['./src/main.js'];
var output = {
    filename: './js/[name].[hash].js',
    path: path.resolve(__dirname, 'dist')
}
var plugins = [
    new CleanWebpackPlugin(['dist']),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: function(module) {
            return module.context && module.context.indexOf('node_modules') !== -1;
        }
    }),
    new ExtractTextPlugin({ filename: 'css/[name].bundle.css', disable: false, allChunks: true }),
    new HtmlWebpackPlugin({
        title: 'web標題',
        template: './src/index.html',
    })
]
if (process.env.NODE_ENV === 'production') {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        compress: {
            warnings: false,
            drop_console: false,
        },
    }), new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"production"'
        }
    }));
} else {
    plugins.push(new webpack.HotModuleReplacementPlugin());
    entryMain.push(hotMiddlewareScript);
    output.publicPath = 'http://localhost/';
}
var webpackConfig = {
    entry: {
        main: entryMain,
    },
    output: output,
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js',
            'style': path.resolve(__dirname, 'src', 'style'),
            'myDiv_component': path.resolve(__dirname, 'src', 'component', 'myDiv.vue'),
            'myPage_component': path.resolve(__dirname, 'src', 'component', 'myPage.vue'),
            'myTypes_types': path.resolve(__dirname, 'src', 'store', 'types.js'),
        }
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    css: ExtractTextPlugin.extract({
                        use: "css-loader!less-loader",
                        fallback: "vue-style-loader"
                    }),
                    js: [{
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015', 'stage-3'],
                            plugins: ['transform-runtime']
                        }
                    }]
                },
                postcss: [require('autoprefixer')({ browsers: ['last 2 versions'] })],
            }
        }, {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'stage-3'],
                plugins: ['transform-runtime']
            }
        }, {
            test: /\.less$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{
                    loader: 'css-loader'
                }, {
                    loader: 'postcss-loader',
                    options: {
                        plugins: function() {
                            return [
                                require('autoprefixer')
                            ]
                        }
                    },
                }, {
                    loader: 'less-loader',
                }, ]
            }),
}, {
    test: /\.jpg?$|\.jpeg?$|\.gif?$|\.png?$/,
    use: [{
        loader: 'url-loader',
        options: {
            limit: 1000,
            outputPath: 'images/'
        }
    }, {
        loader: 'img-loader',
        options: {
            progressive: true
        }
    }]
}]

    },
    plugins: plugins,
}
if (process.env.NODE_ENV === 'production') {} else {
    webpackConfig.devtool = 'cheap-module-eval-source-map';
}
module.exports = webpackConfig;
