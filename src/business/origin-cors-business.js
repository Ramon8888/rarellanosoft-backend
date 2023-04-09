const express = require('express')
const CatOriginCors = require('../models/origin.model')
const {messages} = require('../common/messages.common')
const logger = require('../conf/logger.config')
const { v4: uuidv4 } = require('uuid')

const CatOriginCorsBusiness = {

    createOriginInit(req, res){
        CatOriginCors.create({
            ip_origin:'http://localhost',
            origin:'Local env',
            uuid: uuidv4(),
            description:'Local env',
            status:1
        },{logging: false}).then(resp=>{
            logger.info(messages.NO_ORIGIN_FOUND)
            logger.info(messages.SPLIT)
        })
    },
    findAllOrigins(){
        CatOriginCors.findAll({where:{
            status:1
        }, logging:false})
        .then(resp=>{
            resp.forEach(item=>{
                logger.info(messages.CORS_ORIGINS+item.ip_origin)
            })
            logger.info(messages.SPLIT)
            
        })
    }

}

module.exports = CatOriginCorsBusiness