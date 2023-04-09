const CatSystemBusiness = require("../business/system-business")


const CatSystemsSocket = {

    async catSystemsSockets(io){
        CatSystemBusiness.findAllSystemsSocket(io)
    }

}
module.exports = CatSystemsSocket