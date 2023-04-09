const fs = require('fs')
const path = require('path')

const sslPath = {
    key: fs.readFileSync(path.join(__dirname,'../ssl/rarellano-cloud.key')),
    cert: fs.readFileSync(path.join(__dirname,'../ssl/rarellano-cloud.crt'))
}

module.exports = {
    sslPath
}
