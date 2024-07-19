/*
    Sets up main server application (middleware, routes)
    Connects to database and starts node.js server
*/

const { sequelize, connectToDB } = require('./db/db-connector');

const express = require('express');
const app = express();

connectToDB();

sequelize.sync()

// TODO: routes go here

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

