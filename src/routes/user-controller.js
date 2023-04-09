const express = require('express')
const router = express.Router()
const { body, validationResult} = require('express-validator')

//local dependencies
const verificaToken = require('../middlewares/jwt.middleware')
const UserBusiness = require('../business/user-business')
const {messages} = require('../common/messages.common')
const logger = require('../conf/logger.config')


//paths
const userList = '/user-list'
const newUser = '/new-user'
const updateUser = '/update-user/:id'
const deleteUser = '/delete-user/:id'
const findUserById = '/user/:id'

// get all user no matter role
router.get(userList, verificaToken,  (req, res) => {
    UserBusiness.getAllUsers(req, res)
})

// insert new user no matter role
router.post(newUser,
    body('email').isEmail(),
    body('password').isLength({min: 4}),
    verificaToken,  (req, res) => {

    const email = req.body.email
    const origin = req.body.origin
    const address = req.body.address
    const ipClient = req.ip

    const errorsFileds = validationResult(req)
    if(!errorsFileds.isEmpty()){
        
        //error fields
        logger.info(messages.INVALID_DATA)
        logger.info(messages.SPLIT)
        res.status(400).json({
            message: messages.INVALID_DATA,
            errors: errorsFileds.array()})
    }else{
        UserBusiness.fnNewUser(req, res)
    }
    
})

router.patch(updateUser, verificaToken,  (req, res) => {
    UserBusiness.fnUpdateUser(req, res)
})
router.patch(deleteUser, verificaToken,  (req, res) => {
    UserBusiness.fnDeleteUser(req, res)
})
router.get(findUserById, verificaToken,  (req, res) => {
    UserBusiness.fnFindUserById(req, res)
})

module.exports = router