const { DataTypes } = require('sequelize')
const sequelize = require('../conf/database.config')

const CatModule = sequelize.define('cat_modules',{
    module: DataTypes.STRING,
    uuid: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.INTEGER
},{
    freezeTableName: true
})

module.exports = CatModule