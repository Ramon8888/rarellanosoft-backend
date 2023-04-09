
const express = require('express')
const router = express.Router()
const CatOriginCors = require('../models/origin.model')
const logger = require('../conf/logger.config')
const {messages} = require('../common/messages.common')
const CatOriginCorsBusiness = require('./origin-cors-business')
const TabUser = require('../models/user.model')
const TabUserBusiness = require('./user-business')
const CatRole = require('../models/role.model')
const CatRoleBusiness = require('./role-business')

 //Cors initial

 CatOriginCors.findAll({where:{
    status: 1,
    id: 1
 },logging:false}).then(resp=>{
    if(resp.length<1){
        CatOriginCorsBusiness.createOriginInit()
    }else{
        CatOriginCorsBusiness.findAllOrigins()
    }
 })

 CatRole.findAll({where:{
    status:1,
    id: 1000001
 }, logging:false}).then(resp=>{
    if(resp.length<1){
        CatRoleBusiness.createRolesInit()
    }else{
        CatRoleBusiness.findAllActiveRoles()
    }
 })

 TabUser.findAll({where:{
    email: process.env.APP_SUPER_USER
 }, logging: false}).then(resp=>{
    if(resp.length<1){
        TabUserBusiness.createOriginInit()
    }else{
        logger.info(messages.SUPER_USER+process.env.APP_SUPER_USER)
        logger.info(messages.SPLIT)
    }
 })





module.exports = router