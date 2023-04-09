const jwt = require('jsonwebtoken');
const { messages} = require('../common/messages.common');
const key = require('../conf/jwt.config');
const logger = require('../conf/logger.config');
const TabUser = require('../models/user.model');


async function verificaTokenSocket(token){
    const reqToken = token
    if(!reqToken || reqToken === ''){
        logger.warn(messages.TOKEN_NOT_FOUND)
        return {auth: false}
    }else{
        try{
            const decoded = jwt.verify(token, key.secret)
            
            if(decoded){
                return {auth: true, system: decoded.system, role: decoded.role}
            }else{
                return {auth: false}
            }
            
        }
        catch(error){
            if(error.name === "TokenExpiredError"){
                logger.error(messages.EXPIRED_TOKEN + " ["+error.name+"]")
                return {auth: false}
            }else{
                logger.error(messages.INVALID_TOKEN + " ["+error+"]")
                return {auth: false}
            }
        }
    }
}

module.exports = verificaTokenSocket