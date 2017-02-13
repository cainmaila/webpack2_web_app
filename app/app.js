const webpackDevMiddleware = require("webpack-dev-middleware");
const WebpackHotMiddleware = require('webpack-hot-middleware')
const webpack = require("webpack");
const webpackConfig = require("../webpack.config");
const path = require('path');
const express = require('express');
const app = express();
const compiler = webpack(webpackConfig);
const port = 80;
// app.use(express.static(path.join(__dirname, '..', 'dist')));
app.use(webpackDevMiddleware(compiler, {
    publicPath: 'http://localhost/',
    noInfo: true,
    // lazy: false,
    // watchOptions: {
    //     aggregateTimeout: 300,
    //     poll: true,
    //     stats: {
    //         colors: true
    //     },
    // },
}));
app.use(WebpackHotMiddleware(compiler));
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
