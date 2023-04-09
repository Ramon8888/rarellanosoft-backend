const {messages} = require('../common/messages.common')
const logger = require('../conf/logger.config')
const TabUser = require('../models/user.model')
const BCRYPT_SALT_ROUNDS = 10; // salt rounds
const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid')
const Transporter = require('../conf/smtp.config')
const ActivateAccountEmail = require('../templates/activate-account-email')
const jwt = require('jsonwebtoken')
const key = require('../conf/jwt.config')

const TabUserBusiness = {
    async createOriginInit(){
        let email = process.env.APP_SUPER_USER
        let password = process.env.APP_PASSWORD
        let phone = process.env.APP_SUPER_USER_PHONE
        bcrypt.hash(password, BCRYPT_SALT_ROUNDS, (err, passwordCrypted) => {
        if (err) {
                logger.error(messages.PASSWORD_CRYPT_ERROR)
        } else {
            TabUser.create({
                id: 1000000001,
                uuid: uuidv4(),
                email:email,
                phone: phone,
                password:passwordCrypted,
                emailVerify:1,
                phoneVerify:1,
                status:1,
                roleId:1000001
            },{logging: false}).then(resp=>{
                logger.info(messages.NO_SUPER_USER_FOUND)
                logger.info(messages.SPLIT)
            })
        }
        })
    },
    async fnNewUser(req, res){
        const email = req.body.email
        const userExist = await TabUser.findOne({
            where: {
                email: email
            },
            logging: false
        })
        if(userExist){
            
            logger.info(messages.EMAIL_ALREADY_EXISTS)
            logger.info(messages.SPLIT)
            res.status(500).json({message:"Error - this email already exist"})
        }else{

            bcrypt.hash(req.body.password, BCRYPT_SALT_ROUNDS, (err, passwordCrypted) => {
                if (err) {
                        logger.error(messages.PASSWORD_CRYPT_ERROR)
                        res.status(500).json({message:"Error - Oops! somethign was wrong"})
                } else {
                    const email = req.body.email
                    const uuid = uuidv4()
                    const password = passwordCrypted
                    const phone = req.body.phone
                    const emailVerify = 0
                    const phoneVerify = 0
                    const status = 1
                    const roleId = req.body.roleId
                    const create = TabUser.create({
                        uuid: uuid,
                        email:email,
                        phone: phone,
                        password:password,
                        emailVerify:emailVerify,
                        phoneVerify:phoneVerify,
                        status:status,
                        roleId:roleId
                    },{logging: false})
                    
                    if(!create){
                        logger.info(messages.SERVER_ERROR)
                        logger.info(messages.SPLIT)
                        res.status(500).json({message:"Error - Oops! somethign was wrong"})
                        
                    }else{
                        const expTime = 60 * 10
                        const date = new Date()
                        const system = 'R Arellano Soft'
                        const subject = 'Acivate account'

                        const token = jwt.sign({email: email, date: date, system: system}, key.secret, {
                            expiresIn: expTime
                        })
                        if(!token){
                            logger.warn(messages.TOKEN_NOT_FOUND)
                            res.status(401).json({message: messages.TOKEN_NOT_FOUND, auth: false})
                        }else{
                            let act = ActivateAccountEmail.emailGen(token)
                            let mailOptions = {
                                from: system,
                                //sender: 'sistemas@sappiente.com',
                                to: email,
                                subject:  subject,
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
                        logger.info(messages.USER_CREATED)
                        logger.info(messages.USER_EMAIL_SENT)
                        logger.info(messages.SPLIT)
                        res.status(200).json({message:"User created, a email has been sent for account validation"})
                        }
                    }

                }
                })
            
        }
    },

    getAllUsers(req, res){
        TabUser.findAll({
            attributes: ['id', 'email','uuid', 'status', 'emailVerify'],
            logging:false
        })
        .then(resp => {
            logger.info(messages.GET_METHOD_SUCCESS + '[User list]')
            res.status(200).json({response: {
                message: [messages.GET_METHOD_SUCCESS],
                data: resp
            }})
        })
    },
    fnUpdateUser(){

    },
    fnDeleteUser(){

    },
    fnFindUserById(){

    }

}

module.exports = TabUserBusiness