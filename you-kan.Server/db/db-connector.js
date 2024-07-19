/*
    Instantiates sequelize object and db connector function
*/

const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

// TODO: Add database credentials to an .env file 
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
});

const connectToDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connected to MySQL DB");
    } catch(err) {
        console.log("Error connecting to MySQL DB");
    }
}

module.exports = {sequelize, connectToDB};