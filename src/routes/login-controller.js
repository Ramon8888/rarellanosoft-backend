const express = require('express')
const router = express.Router()
const { body, validationResult} = require('express-validator')

const LoginBusiness = require('../business/login-business')
const {messages} = require('../common/messages.common')
const logger = require('../conf/logger.config')

//paths
const loginUrl = "/login"
const newSessionUrl = "/token-validator"
const recoveryPasswordUrl = "/recovery-password"

router.post(
    loginUrl,
    body('email').isEmail(),
    body('password').isLength({min: 4}),
    async (req, res) => {

    let email = req.body.email
    let origin = req.body.origin
    let address = req.body.address
    let ipClient = req.ip
    
    const errorsFileds = validationResult(req)
    if(!errorsFileds.isEmpty()){
        
        //error fields
        logger.info(messages.INVALID_DATA+" [ "+email+" ][User ip: "+address+" ]"+"[Origin: "+origin+" ][App client:"+ipClient+"]")
        res.status(400).json({
            message: messages.INVALID_DATA,
            errors: errorsFileds.array()})
    }else{
        LoginBusiness.login(req, res)
    }
})

router.post(newSessionUrl, (req, res)=>{
    LoginBusiness.tokenValidation(req, res)
})

router.post(recoveryPasswordUrl, (req, res)=>{
    LoginBusiness.recoveryPass(req, res)
})

module.exports = router