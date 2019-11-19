// { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
'use strict';
const { createLogger, format, transports } = require('winston');
const fs = require('fs');
const path = require('path');
class Logger{
    constructor(){
        this.env = process.env.NODE_ENV || 'development';
        this.logDir = `log`;

        // Create the log directory if it does not exist
        if (!fs.existsSync(this.logDir)) {
        fs.mkdirSync(this.logDir);
        }

        this.filename = path.join(this.logDir, `results.log`);

        this.logger = createLogger({
        // change level if in dev environment versus production
        level: this.env === 'development' ? 'debug' : 'info',
        format: format.combine(
            format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
            }),
            format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
        ),
        transports: [
            new transports.Console({
            level: 'silly',
            format: format.combine(
                format.colorize(),
                format.printf(
                info => `${info.timestamp} ${info.level}: ${info.message}`
                )
            )
            }),
            new transports.File({filename: this.filename})
        ]
        });
    }

}

module.exports = Logger
