/*
    Instantiates sequelize object and db connector function
*/

// load configs for test database if test environment, otherwise default to regular .env file
const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env' 

const { Sequelize } = require('sequelize');
require('dotenv').config({ path: envFile });

const sequelize = new Sequelize(
  {
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    storage: process.env.STORAGE,
    host: process.env.DB_HOST,
    dialect: process.env.DIALECT,
    port: process.env.DB_PORT,
  }
);

module.exports = sequelize;