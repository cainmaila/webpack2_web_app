var log4js = require('log4js')
module.exports = {
    init(config) {
        if (!config) {
            config = {
                appenders: [{
                    type: 'console'
                }, {
                    type: 'file',
                    filename: 'logs/log',
                    maxLogSize: 20480,
                    backups: 3,
                    category: 'log',
                }],
            }
        }
        log4js.configure(config)
        this.setLogLv()
    },
    setLogLv(lv, log) {
        log = log ? log : 'log'
        lv = lv ? lv : 'trace'
        this[log] = log4js.getLogger(log)
        this[log].setLevel(lv)
    },
    getLog(log) {
        log = log ? log : 'log'
        var logger = this[log]
        return logger.trace.bind(logger)
    },
    getDebug(log) {
        log = log ? log : 'log'
        var logger = this[log]
        return logger.debug.bind(logger)
    },
    getInfo(log) {
        log = log ? log : 'log'
        var logger = this[log]
        return logger.info.bind(logger)
    },
    getWarn(log) {
        log = log ? log : 'log'
        var logger = this[log]
        return logger.warn.bind(logger)
    },
    getError(log) {
        log = log ? log : 'log'
        var logger = this[log]
        return logger.error.bind(logger)
    },
    getFatal(log) {
        log = log ? log : 'log'
        var logger = this[log]
        return logger.fatal.bind(logger)
    },
}
