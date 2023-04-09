require('dotenv').config()
const  { Sequelize } = require('sequelize');

const dbDatabase = process.env.DB_DATABASE
const dbUsername = process.env.DB_USERNAME
const dbPassword = process.env.DB_PASSWORD
const dbHost = process.env.DB_HOST
const dbDialect = process.env.DB_DIALECT

const sequelize = new Sequelize(
    `postgres://${dbUsername}:${dbPassword}@${dbHost}:5432/${dbDatabase}`
);

module.exports = sequelize;