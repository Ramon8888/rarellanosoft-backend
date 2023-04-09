const {messages} = require('../common/messages.common')
const logger = require('../conf/logger.config')
const CatRole = require('../models/role.model')
const { v4: uuidv4 } = require('uuid')

const CatRoleBusiness = {

    createRolesInit(){
        logger.info(messages.NO_ROLES_FOUND)
        try{
            CatRole.create({id:1000001, uuid: uuidv4(), role:'God', description:'God level',status:1}, {logging: false})
            CatRole.create({id:1000002, uuid: uuidv4(), role:'Super user',description:'Super user role',status:1}, {logging: false})
            CatRole.create({id:1000003, uuid: uuidv4(), role:'Administrator',description:'Administrator role',status:1}, {logging: false})
            CatRole.create({id:1000004, uuid: uuidv4(), role:'Finantial',description:'Finantial role',status:1}, {logging: false})
            CatRole.create({id:1000005, uuid: uuidv4(), role:'Customer service',description:'Custome service role',status:1}, {logging: false})
            CatRole.create({id:1000006, uuid: uuidv4(), role:'Marketing',description:'Marketing role',status:1}, {logging: false})
            CatRole.create({id:1000007, uuid: uuidv4(), role:'User',description:'User role',status:1}, {logging: false})
            CatRole.create({id:1000008, uuid: uuidv4(), role:'IT Support',description:'IT Support role',status:1}, {logging: false})
        }catch (error){
            console.log('error------->' +error)
        }
        
        logger.info(messages.SPLIT)
    },
    findAllActiveRoles(){
        CatRole.findAll({where:{
            status:1
        }, logging: false}).then(resp=>{
            resp.forEach(item=>{
                logger.info(messages.ROLES_FOUND + item.role)
            })
            logger.info(messages.SPLIT)
    })
    }

}

module.exports = CatRoleBusiness