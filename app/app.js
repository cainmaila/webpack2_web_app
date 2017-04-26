const path = require('path')
const express = require('express')
const fs = require('fs')
const Vue = require('vue')
const ssr = new Vue({
    // template: '<div>你已经在这花了 {{ counter }} 秒。</div>',
    // template: require('./template/ssr.html'),
    template: fs.readFileSync('./app/template/ssr.html', 'utf8'),
    data: {
        counter: 100,
        cain: 'cain !!!',
    }
    // render: function(h) {
    //     return h('p', 'hello world')
    // }
})

const renderer = require('vue-server-renderer').createRenderer()
const logPlugin = require('./logPlugin.js')
const app = express();
const port = 80;

/* =====log4js===== */
logPlugin.init({
    appenders: [{
        type: 'console'
    }, {
        type: 'file',
        filename: 'logs/log',
        maxLogSize: 20480,
        backups: 3,
        category: 'log',
    }, {
        type: 'file',
        filename: 'logs/dev',
        maxLogSize: 20480,
        backups: 3,
        category: 'dev',
    }],
})
logPlugin.setLogLv('debug', 'dev')
const log = logPlugin.getLog()
log('use logPlugin !!')

/* =====log4js end===== */

if (process.env.NODE_ENV === 'develop') {
    const webpackDev = require('./webpackDev.js');
    webpackDev(app);
} else {
    app.use(express.static(path.join(__dirname, '..', 'dist')));
}


app.use(express.static(path.join(__dirname, '..', 'resources')))
app.use(express.static(path.join(__dirname, '..', 'language')))
app.use('/ssr/:id', (req, res) => {
    console.log(renderer)
    renderer.renderToString(ssr, function(error, html) {
        if (error) throw error
        console.log(html)
            // res.send('<!DOCTYPE html>' + html)
        res.send('<!DOCTYPE html>' + html)
            // => <p server-rendered="true">hello world</p>
    })
})

app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);
app.use(status404);
app.listen(port, () => {
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
function status404(req, res) { res.status(404).send('404 error'); }
