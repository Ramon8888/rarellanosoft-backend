const { DataTypes } = require('sequelize')
const sequelize = require('../conf/database.config')

const TabSession = sequelize.define('tab_sessions',{
    login: DataTypes.DATE,
    uuid: DataTypes.STRING,
    logout: DataTypes.DATE,
    user: DataTypes.INTEGER,
    origin: DataTypes.STRING,
    system: DataTypes.STRING,
    role: DataTypes.STRING,
    status: DataTypes.INTEGER
},{
    freezeTableName: true
})

module.exports = TabSession