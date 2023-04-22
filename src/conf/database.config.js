require('dotenv').config()
const  { Sequelize } = require('sequelize');

// const dbDatabasePos = process.env.DB_DATABASE_POS
// const dbUsernamePos = process.env.DB_USERNAME_POS
// const dbPasswordPos = process.env.DB_PASSWORD_POS
// const dbHostPos = process.env.DB_HOST_POS
// const dbPortPos = process.env.DB_PORT_POS

const dbDatabaseMys = process.env.DB_DATABASE_MYS
const dbUsernameMys = process.env.DB_USERNAME_MYS
const dbPasswordMys = process.env.DB_PASSWORD_MYS
const dbHostMys = process.env.DB_HOST_MSY
const dbDialectMys = process.env.DB_DIALECT_MYS
const dbPortMys = process.env.DB_PORT_MYS

// const sequelizePostgres = new Sequelize(
//     `postgres://${dbUsernamePos}:${dbPasswordPos}@${dbHostPos}:${}/${dbDatabasePos}`
// );

const sequelize = new Sequelize(
    dbDatabaseMys,
    dbUsernameMys,
    dbPasswordMys, {
        host: dbHostMys,
        port:dbPortMys,
        dialect: dbDialectMys
    }
);

module.exports = sequelize;