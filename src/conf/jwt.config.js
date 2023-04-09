module.exports = {
    secret: process.env.JWT_KEY, //JWT Secret key
    shortSession: 60 * 60,  //Expiration time
    longSession:31536000
}