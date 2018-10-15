const fs = require('fs');
const path = require('path');

const winston = require('winston');

const env = process.env.NODE_ENV || 'development';
const format = winston.format;
const logDir = 'logs';

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const options = {
    file: {
        filename: path.join(logDir, 'app.log'),
        level: 'info',
        format: format.combine(
            format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss',
            }),
            format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
        ),
    },
    console: {
        level: env === 'development' ? 'debug' : 'info',
        format: format.combine(
            format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss',
            }),
            format.colorize(),
            format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
        ),
    },
};

const logger = winston.createLogger({
    transports: [
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console),
    ],
    exitOnError: false,
});

logger.stream = {
    write: function (message) {
        logger.info(message);
    },
};

module.exports = logger;
