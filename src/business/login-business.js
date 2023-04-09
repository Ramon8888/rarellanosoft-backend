const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

//local dependencies
const key = require('../conf/jwt.config')
const TabUser = require('../models/user.model')
const { shortSession, longSession } = require('../conf/jwt.config')
const {messages} = require('../common/messages.common')
const logger = require('../conf/logger.config')
const subjectRecoveryPassword = 'R Arellano Auth - Password recovery'
const RecoveryPasswordEmail = require("../templates/recovery-password-email")
const Transporter = require('../conf/smtp.config')

const LoginBusiness = {

    async login(req, res){
        let origin = req.body.origin
        let accessType = req.body.accessType
        let address = req.body.address
        let ipClient = req.ip
        let expTime = 0;
        let rolesList = []

        //if fields are fine
        const { email, password}  = req.body
        //---------------------------------------------------
        // Create user object to find the row in the database
        //---------------------------------------------------
        const user = await TabUser.findOne({email: email, where: {
            email:  email
        }, logging: false,
        attributes: ['id', 'email', 'status', 'password', 'emailVerify']
        })

        
        
        if(!user){
            //If there is'nt a user found show this mesagge
            logger.warn(messages.INVALID_EMAIL+" [ "+email+" ][ User ip: "+address+" ]"+"[Origin: "+origin+" ][App client:"+ipClient+"]")
            res.status(401).json({message: messages.INVALID_EMAIL})
        }else{
            const userInformation = { profiles: user}
            // Else execute bcrypt validation
            const valid = await bcrypt.compare(password, user.password )
            if(!valid){
                // If validation fail, show this message and stop the function
                logger.warn(messages.INVALID_PASSWORD+" for user: [ "+email+" ][User ip: "+address+" ]"+"[Origin: "+origin+" ][App client:"+ipClient+"]")
                res.status(401).json({
                    message: messages.INVALID_PASSWORD
                })
            }else{
                //Else validate if user is active
                if(user.status===0){
                    //If user is "0" show this 
                    logger.warn(messages.USER_LOCKED+" [ "+email+" ][User ip: "+address+" ]"+"[Origin: "+origin+" ][App client:"+ipClient+"]")
                    res.status(401).json({
                    message: messages.USER_LOCKED
                    })
                }else{
                    //Else validate if user is validate by email
                    if(user.emailVerify===0){
                        //If is'nt validated show this message and stop the function
                        logger.warn(messages.USER_NOT_VERIFIED+" [ "+email+" ][User ip: "+address+" ]"+"[Origin: "+origin+" ][App client:"+ipClient+"]")
                        res.status(401).json({
                        message: messages.USER_NOT_VERIFIED
                    })
                    }else{
                            
                            const userData= {user: user.id, email: user.email, system: origin, profiles: rolesList}
                            // Sign data with jwt
                            
                            logger.info(messages.ACCESS_ALLOWED+" [ "+email+" ][User ip: "+address+" ]"+"[Origin: "+origin+" ][App client:"+ipClient+"]")
                            if(accessType===true){
                                expTime = longSession
                                logger.info(messages.LONG_SESSION_TIME+" [ "+email+" ][User ip: "+address+" ]"+"[Origin: "+origin+" ][App client:"+ipClient+"]")
                            }else{
                                expTime = shortSession
                                logger.info(messages.SHORT_SESSION_TIME+" [ "+email+" ][User ip: "+address+" ]"+"[Origin: "+origin+" ][App client:"+ipClient+"]")
                            }
                            const token = jwt.sign(userData, key.secret, {expiresIn:expTime})
                            res.status(200).json({message: [messages.ACCESS_ALLOWED], token, data: {
                                auth: true,
                                message: 'Access allowed',
                                userData: userData
                            }})
                        
                        
                        
                    }
                }
                
            }
        }

    },
    async tokenValidation(req, res){
        const token = req.headers['x-access-token']
    if(!token){
        logger.warn(messages.TOKEN_NOT_FOUND)
        res.status(401).json({message: messages.TOKEN_NOT_FOUND, auth: false})
    }else{
        try{
            const decoded = jwt.verify(token, key.secret)
            //req.usuarioId = decoded.id
            var hr = parseInt((decoded.exp % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
            var min = parseInt((decoded.exp % (1000 * 60 * 60)) / (1000 * 60))
            logger.info(messages.VALID_TOKEN)
            res.status(200).json({message: [messages.VALID_TOKEN], token, data: {
                auth: true,
                message: 'Access allowed',
                userId: decoded.user
            }})
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
    },
    recoveryPass(req, res){
        const expTime = 60 * 10
        const date = new Date()
        const system = 'R Arellano Auth'

        const token = jwt.sign({email: req.body.email, date: date, system: system}, key.secret, {
            expiresIn: expTime
        })
        if(!token){
            logger.warn(messages.TOKEN_NOT_FOUND)
            res.status(401).json({message: messages.TOKEN_NOT_FOUND, auth: false})
        }else{
            TabUser.findAll({
                where: {
                    email: req.body.email,
                    status: 1
                },
                attributes:['id', 'email'],
                logging: false
            }).then(resp=>{
                if(resp.length > 0 && resp.length != null){
                    let act = RecoveryPasswordEmail.emailGen(token)
                    let mailOptions = {
                        from: 'rarellano-soft',
                        //sender: 'sistemas@sappiente.com',
                        to: req.body.email,
                        subject:  subjectRecoveryPassword,
                        html: act}
    
                    Transporter.sendMail(mailOptions, (error, info)=>{
                        if(error){
                            logger.warn(messages.EMAIL_NOT_SENT)
                            console.log(error)
                            res.status(500).json({message:messages.EMAIL_NOT_SENT,
                                error
                            });
    
                        }else{
                            logger.warn(messages.EMAIL_SENT)
                            res.status(200).json({message:messages.EMAIL_SENT})
    
                        }
                    })
                    
                }else{
                    logger.warn(messages.EMAIL_NOT_EXIST)
                    res.status(404).json({message: "User not found"})
                }
                
            })
        }
        
    }

}

module.exports = LoginBusiness