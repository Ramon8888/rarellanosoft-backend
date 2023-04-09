const { DataTypes } = require('sequelize')
const sequelize = require('../conf/database.config')
const CatRole = require('./role.model')

const TabUser = sequelize.define('tab_users',{
    email: DataTypes.STRING,
    uuid: DataTypes.STRING,
    password: DataTypes.STRING,
    phone:DataTypes.STRING,
    emailVerify: DataTypes.INTEGER,
    phoneVerify: DataTypes.INTEGER,
    status: DataTypes.INTEGER
},{
    freezeTableName: true
})

TabUser.CatRole = TabUser.belongsTo(CatRole, {foreignKey:'roleId'})
CatRole.TabUser = CatRole.hasMany(TabUser, {foreignKey: 'roleId'})

module.exports = TabUser, TabUser.CatRole