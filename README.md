# Web App Framework Guides

本部分包含有建置這個 Web App Framework 與提供的各種工具安裝。

## 入門

這個Framework使用了以下技術架構

#### JavaScript支援

* es6 - stage 3 (babel)
* vue - 資料驅動與view綁定
* vue-router - SPA路由管理
* vuex - 单向数据流状态管理模式
* axios - ajax庫

#### CSS

* less - css前置處理氣
* postcss - css後置處理器

#### Html

* vue-template - vue組件化

#### 自動化build

* webpack 2

## 安裝

#### 環境需求

以下以 Ubuntu 系統為例

* **[node v6.9.x 以上](https://nodejs.org/en/)**，目前建議穩定版本 **v 6.9.5**
* 建議使用 **[nvm](https://github.com/creationix/nvm/blob/master/README.markdown)** 安裝管理node

**安裝nvm**
```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
```
安裝完成後需要退出command控制台，再次登入以便載入系統變數方可順利執行nvm

**驗證nvm**
```bash
nvm -v
```

**安裝與設定nodejs**
```bash
nvm install 6.9.5
nvm use 6.9.5
nvm alias default 6.9.5
```

**驗證nodejs**
```bash
node -v
```

> window版本請直接[官網](https://nodejs.org/en/)安裝node js

**安裝yarn**

[Yarn](http://yarnpkg.top/)是一個依賴管理工具，它能夠管理你的代碼，並與全世界的開發者分享代碼。 Yarn是高效、安全和可靠的，你完全可以安心使用。<br>
> 過去你可能使用 npm ，但是我們建議你使用 yarn 作為你的套件管理工具。

```bash
sudo apt-key adv --keyserver pgp.mit.edu --recv D101F7899D41F3C3
echo "deb http://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
```

> window版本請直接[官網](http://yarnpkg.top/Installation.html)安裝yarn

#### 安裝專案所需套件

**建立package.json**
```bash
yarn init
```

**安裝套件**
webpack & Plugins
```bash
yarn add --dev webpack webpack-dev-middleware webpack-hot-middleware clean-webpack-plugin
```

javaScript & es6 (babel)
```bash
yarn add --dev babel-core babel-loader babel-plugin-transform-runtime babel-polyfill babel-preset-es2015 babel-preset-stage-3
```

css & less & postcss
```bash
yarn add --dev css-loader style-loader less less-loader postcss postcss-loader autoprefixer extract-text-webpack-plugin
```

vue & vue plugins
```bash
yarn add --dev vue vue-loader vue-template-compiler vue-router vuex
```

html template
```bash
yarn add --dev html-webpack-plugin
```

ajax
```bash
yarn add --dev axios
```

controller (Express 4)
```bash
yarn add express method-override shrink-ray cors body-parser cookie-parser method-override
```

## 建置設定

#### 基礎template建置

**建立src目錄**
```bash
mkdir src
```
所以原始代碼放置位置

**建置首頁基礎template版面**
src/index.html
```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <title>
        <%= htmlWebpackPlugin.options.title %>
    </title>
</head>

<body>
    <div id="app"></div>
</body>

</html>
```

**建置首頁js入口**

src/main.js

**建置web controller**
建置app資料夾
```bash
mkdir app
```
web server 服務代碼放置處

app/app.js 主程序入口
```javaScript
const path = require('path');
const express = require('express');
const app = express();
const port = 80;
if (process.env.NODE_ENV === 'develop') {
    const webpackDev = require('./webpackDev.js');
    webpackDev(app);
} else {
    app.use(express.static(path.join(__dirname, '..', 'dist')));
}
app.use(express.static(path.join(__dirname, '..', 'resources')));
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);
app.use(status404);
app.listen(port, function() {
    console.log('runing Web Server in ' + port + ' port...');
});

/**
 * 錯誤輸出
 */
function logErrors(err, req, res, next) {
    console.log('app : logErrors => ', err.stack);
    next(err);
}

/**
 * 500錯誤
 */
function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
        res.status(500).send({
            error: 'Something failed!'
        });
    } else {
        next(err);
    }
}

/**
 * 500錯誤
 */
function errorHandler(err, req, res, next) {
    res.status(500);
    res.render('error', {
        error: err
    });
}

/**
 * 404錯誤
 */
function status404(req, res) {
    res.status(404).send('404 error');
}
```

app/webpackDev.js 開發階段編譯服務代碼
```javascript
const webpackDevMiddleware = require("webpack-dev-middleware");
const WebpackHotMiddleware = require('webpack-hot-middleware')
const webpack = require("webpack");
const webpackConfig = require("../webpack.config");
const compiler = webpack(webpackConfig);
const webpackDev = function(app) {
    app.use(webpackDevMiddleware(compiler, {
        publicPath: 'http://localhost/',
        noInfo: true,
    }));
    app.use(WebpackHotMiddleware(compiler));
}
module.exports = webpackDev;
```
**建置靜態素材資料**

```bash
mkdir 
```

**建置專案常數資料**

config.json

比如 express 的對外 port 或者一些資源IP，與其他可能會修改的專案變量都可以放在這


#### build&develop設定檔建置

**建立 webpack.config.js**
```javascript
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
    }), new webpack.HotModuleReplacementPlugin());
} else {
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
                }]
            }),
        }]
    },
    plugins: plugins,
}
if (process.env.NODE_ENV === 'production') {} else {
    webpackConfig.devtool = 'cheap-module-eval-source-map';
}
module.exports = webpackConfig;
```
你可以修改

**修改package.json**
增加package.json中的scripts標籤
```javascript
,"scripts": {
        "dev": "set NODE_ENV=develop&node app/app.js",
        "build": "set NODE_ENV=production&webpack",
        "start": "set NODE_ENV=production&node app/app.js"
    }
```

## 開發階段

開發時期請執行以下
```bash
yarn dev
```
webpack會監視main.js入口相關檔案，程序變動時會自動編譯並反映在瀏覽器上

## 專案架構

```
web app
├───package.json -------- 插件管理文件
├───webpack.config.js --- webpack2發佈設定
├───env.js -------------- 編譯替換變數
├───config.json --------- 常數參數設定檔 
├───app ----------------- web server目錄
│   ├───app.js ---------- web server入口檔案
│   └───webpackDev.js --- webpack2編譯階段掛件
├───resources ----------- 靜態資源放置處
├───dist ---------------- build完成的輸出檔案
└───src ----------------- 原始代碼目錄
    ├───component ------- vue組件目錄
    ├───store ----------- vuex store目錄
    │   ├───modules ----- vuex modules目錄
    │   └───types.js ---- Event Type定義檔
    └───style ----------- less樣式檔目錄
```

## 編譯發佈

發佈檔案請執行以下
```bash
yarn build
```
檔案會發佈於dist目錄

## 範例專案

[git位置](http://60.251.125.207:8888/Leedian-js-tools/webAppFramework)

## eslint語法檢查設定

sublime 3 使用esline語法檢查

安裝全域掛件
```bash
npm i eslint eslint-plugin-vue -g 
```

安裝sublime 3 掛件
**SublimeLinter**
**SublimeLinter-contrib-eslint**

新增eslint規則檔

.eslintrc
```json
{
    "plugins": ["vue"],
    "parserOptions": {
        "ecmaVersion": 8,
        "sourceType": "module",
        "ecmaFeatures":{
            "experimentalObjectRestSpread":true
        }
    },
    "rules": {
        "indent": ["error", 4],
        "no-console":"warn",
        "eqeqeq":"warn",
        "no-alert": "warn",
        "no-eval":"error",
        "no-undef-init":"error",
        "no-unused-vars":"warn",
        "no-var": "error",
        "no-const-assign":"error",
        "no-dupe-class-members": "error",
        "no-extra-semi": "error",
        "camelcase":"error",
        "object-curly-newline":["warn", {
            "ObjectPattern": {"multiline": true}
        }]
    }   
}
```
重開sublime即可