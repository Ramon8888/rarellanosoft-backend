const path = require('path')
const swaggerConfig = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "R Arellano Soft - Auth",
            version: "2.0.0",
            description: "This is the doc web site from R Arellano Soft - Auth",
            termsOfService: "https://rarellano-soft.com",
            license: {
                name: "Licence",
                url: "https://rarellano-soft.com"
            },
            contact:{
                name: "Ramon Arellano Castro",
                url: "https://rarellano-soft.com",
                email: "ramon.arellano@rarellano-soft.com"
            }
        },
        servers: [
            {
                url: "http://localhost:4100"
            }
        ]
    },
    apis:[
        `${path.join(__dirname, "../docs/*.js")}`,
        `${path.join(__dirname, "../docs/sys-rarellano-doc/*.js")}`
    ]
}

module.exports = swaggerConfig