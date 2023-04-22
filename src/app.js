//npm dependencies
const express = require('express')
const bodyParser = require('body-parser')
const { Server } = require('socket.io')
const http = require('http')
const https = require('https')
const cors = require('cors')
const path = require('path')
const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')
require('dotenv').config()

//local dependencies
const Banner = require('./utils/banner')
const {messages, flags} = require('./common/messages.common')
const swaggerConfig = require('./conf/swagger.config')
const {sslPath} = require('./conf/https.config')
const CatOriginCorsBusiness = require('./business/origin-cors-business')
const sequelize = require('./conf/database.config')
const logger = require('./conf/logger.config')
const MainSocket = require('./sockets/main-socket')

// Global vairables
const app = express() // Main Server
const PRODUCTION = 'production' //Production string
const PUBLIC_DIR = 'public' // public path

if(process.env.ENV===PRODUCTION){
      server = https.createServer(sslPath, app)
}else{
      server = http.createServer(app)
}
const port = parseInt(process.env.PORT, 10) || process.env.APP_HOST
const io = new Server(server)


//app config
app.use(express.static(path.join(__dirname, PUBLIC_DIR)))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(swaggerConfig)))

//routes
app.use(express.static(path.join(__dirname, 'public')))
app.use('/', require('./routes/origin-cors-controller'))
app.use('/', require('./routes/login-controller'))
app.use('/', require('./routes/role-controller'))
app.use('/', require('./routes/user-controller'))
//
MainSocket.sessionManagement(io)
// Start app
server.listen( port, '0.0.0.0', async function () {
      
      await sequelize.sync({ force: false,logging: false}).then(() => {
            logger.info(Banner.banner());
            logger.info(messages.SPLIT);
            logger.info('✓ '+messages.DATABASE_SUCCESS_CONNECTION)
            logger.info('✓ '+'DB Engine: [ ' + process.env.DB_DIALECT_MYS+']')
            logger.info('✓ '+'DB Host:   [ ' + process.env.DB_HOST_MYS+']')
            logger.info('✓ '+'DB Name:   [ ' + process.env.DB_DATABASE_MYS+']')
            logger.info('✓ '+'DB Name:   [ ' + process.env.DB_PORT_MYS+']')
      }).catch(error => {
            logger.error(flags.RED, messages.DATABASE_ERROR_CONNECTION)
            logger.error(error)
      })
      switch(process.env.ENV){
            case "production":
                  logger.info('✓ '+messages.HTTPS_MODE)
                  break
            default:
                  logger.info('✓ '+messages.HTTP_MODE)
                  break
      }

      await logger.info('✓ '+messages.SERVER_SUCCESS_START + " : " + port)
      await logger.info('✓ '+messages.CURRENT_ENV +" ["+process.env.ENV+"]")
      await logger.info('✓ '+messages.SOCKETS_STARTED_SUCCESSFULY)
      
      if(swaggerConfig !== null){
            logger.info('✓ '+messages.SWAGGER_STARTED)
       }else{
           logger.error(messages.SWAGGER_ERROR)
       }
      app.use('/',require('./business/app-init-data'))
      await logger.info(messages.SPLIT)
      
})




