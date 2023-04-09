const fs = require('fs')
const path = require('path')
const banner = path.join(__dirname,'banner.txt')

var readFile
fs.readFile(banner, 'utf-8', (error, data) =>{
    readFile = data
})
Banner = {

    banner(){
        return readFile
    }
    
}



module.exports = Banner