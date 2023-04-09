const jwt = require('jsonwebtoken');
const { messages} = require('../common/messages.common');
const key = require('../conf/jwt.config');
const logger = require('../conf/logger.config');

const PRODUCTION = 'production'

function verificaToken(req, res, next){
    if(process.env.ENV==PRODUCTION){
        const token = req.headers['x-access-token']
        if(!token){
            logger.warn(messages.TOKEN_NOT_FOUND)
            res.status(401).json({message: messages.TOKEN_NOT_FOUND, auth: false})
        }else{
            try{
                const decoded = jwt.verify(token, key.secret)
                //req.usuarioId = decoded.id
                //var hr = parseInt((decoded.exp % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
                //var min = parseInt((decoded.exp % (1000 * 60 * 60)) / (1000 * 60))
                next()
            }
            catch(error){
                if(error.name === "TokenExpiredError"){
                logger.error(messages.EXPIRED_TOKEN + " ["+error.name+"]")
                    res.status(401).json(messages.EXPIRED_TOKEN)
                }else{
                    logger.error(messages.INVALID_TOKEN + " ["+error.name+"]")
                    res.status(401).json(messages.INVALID_TOKEN)
                }
            }
        }
    }else{
        next()
    }
}

module.exports = verificaToken