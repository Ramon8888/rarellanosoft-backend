const { DataTypes } = require('sequelize')
const sequelize = require('../conf/database.config')

const CatOriginCors = sequelize.define('cat_origin_cors',{
    ip_origin: DataTypes.STRING,
    uuid: DataTypes.STRING,
    origin: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.INTEGER
},{
    freezeTableName: true
})

module.exports = CatOriginCors