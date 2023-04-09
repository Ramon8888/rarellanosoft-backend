
const verificaTokenSocket = require('../middlewares/jwt.middleware.socket')
const logger = require('../conf/logger.config')
const TabUser = require('../models/user.model')
const { permissionS } = require('../common/permission.common')

permissionAuthGod = {auth: true, system: 'RA-AUTH-APP', role: 'God'}
MainSocket = {
    sessionManagement(io){
        io.on('connection', (socket)=>{
            logger.info(messages.SOCKET_CONNECTION_ENABLED +" Id: "+ socket.id)
            socket.on('client:authentication', (token)=>{
                const checkToken = verificaTokenSocket(token)
                checkToken.then(resp=>{
                    if(resp.auth===true){
                        const system = resp.system
                        if(system === permissionAuthGod.system){
                            if(resp.role === permissionAuthGod.role){
                                TabUser.findAll({
                                    attributes:['id', 'email', 'verify', 'status'],
                                    logging: false
                                }).then(resp=>{
                                    let userList = resp
                                    io.on('server:userList',(newUser)=>{
                                        userList.push(newUser)
                                    } )
                                    io.emit('server:userList', userList)
                                    logger.info(messages.SOCKET_COMMUNICATION_SUCCESS +" Id: "+ socket.id)
                                })
                            }else{
                                io.emit('client:authentication', {message: "User not signed"})
                                logger.info(messages.ERROR_TOKEN +" - Client Id: "+ socket.id)
                            }
                        }else{
                            io.emit('server:socketCommunicationDenied', "You don't have permission to access to this socket")
                            logger.info(messages.SOCKET_PERMISSION_DENIED +" Id: "+ socket.id)
                        }
                    }else{
                        io.emit('client:authentication', {message: "User not signed"})
                        logger.info(messages.ERROR_TOKEN +" - Client Id: "+ socket.id)
                    }
                })
            })
            socket.on('disconnect', () => {
                logger.info(messages.SOCKET_CONNECTION_DISABLED +" Id: "+ socket.id)
            })
            // const isLogged = verificaTokenSocket(token)
            // isLogged.then(r=>{
            //         console.log(r.auth)
            //         auth = r
            //         const test = [true, false]

            //         switch(auth.auth){
            //             case true:
            //                     console.log("yes")
            //             break
            //             case false:
            //                     console.log("adios")
            //             break
            //             default:
            //                     console.log('Nobody')
            //         }
                    
            //         const validation = auth.auth
            //         if(validation===true){
            //             CatSystemsSocket.catSystemsSockets(socket)
            //             socket.emit('server:sessionValidation',[{message:'Access allowed'}])
            //         }else{
            //             userList = []
            //             socket.emit('server:sessionValidation',[{message:'You dont have permission :('}])
            //         }
            //         userList = [{email:'rac1qgmail.com', password: "1234"}]
            //         io.emit('server:userList', userList)
            //         logger.info(messages.SOCKET_CONNECTION_ENABLED +" Id: "+ socket.id)
            //         socket.on('nothing', (data)=> {
            //                     logger.warn(data)
                        
            //         })
            //         socket.on('sendData', (data)=>{
            //             logger.info(data);
            //         })
                    
            //         socket.on('client:newUser', (data)=>{
            //             userList.push(data)
            //             io.emit('server:userList', userList)
            //         }) 
            // })
            

            

            
        })
    }
}

module.exports = MainSocket