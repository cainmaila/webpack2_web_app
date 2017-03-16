let WEB_SERVER = 'http://127.0.0.1';
module.exports = {
    NODE_ENV: JSON.stringify('production'),
    WEB_SERVER: JSON.stringify(process.env.WEB_SERVER || WEB_SERVER),
}
