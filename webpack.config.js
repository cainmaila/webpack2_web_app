var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    entry: {
        main: './src/main.js',
    },
    output: {
        filename: './js/[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js',
            // 'myDiv_component': '/src/component/myDiv.vue',
            // 'myPage_component': '/src/component/myPage.vue',
            // 'myTypes_types': '/src/store/types.js',
        }
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    css: ExtractTextPlugin.extract({
                        loader: "css-loader!less-loader",
                        fallbackLoader: "vue-style-loader"
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
                }]
            }),
        }]
    },
    plugins: [
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
            var: 'v0.0.1',
            template: './src/index.ejs',
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"',
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //     minimize: true,
        //     compress: {
        //         warnings: false,
        //         drop_console: false,
        //     }
        // }),

    ]
};
