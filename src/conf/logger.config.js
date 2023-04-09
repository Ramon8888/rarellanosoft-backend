const { createLogger, transports, format } = require('winston')
const path = require('path')

const customFormat = format.combine(format.timestamp('yyyy-mm-dd'), format.printf((info) =>{
    return `${info.timestamp} [${info.level.toUpperCase()}] ${info.message}`
}))

const logger = createLogger({
    format: customFormat,
    transports: [
        new transports.Console(),
        new transports.File({ filename: path.join(__dirname, '../logs/app.log')})
    ]
})

module.exports = logger