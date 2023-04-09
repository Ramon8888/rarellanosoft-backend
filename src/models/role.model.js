const { DataTypes } = require('sequelize')
const sequelize = require('../conf/database.config')

const CatRole = sequelize.define('cat_roles',{
    role: DataTypes.STRING,
    uuid: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.INTEGER
},{
    freezeTableName: true
})

module.exports = CatRole