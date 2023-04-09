

var allowedOrigins = process.env.ORIGIN_CORS

const corsOptions = { 
    origin: function(origin, callback){
        if(!origin) return callback(null, true)

        if(allowedOrigins.indexOf(origin) === -1){
            var msg = 'The CORS policy for this sie does not ' +
            'allow access from the specified Origin.'
            return callback(new Error(msg), false) 
        }

        return callback(null, true);
    }, optionsSuccessStatus: 200 }


module.exports = {
    corsOpt: corsOptions
}
