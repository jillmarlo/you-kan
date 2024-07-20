/*
    Sets up main server application (middleware, routes)
    Connects to database and starts node.js server
*/
const express = require('express');
const app = express();

const taskRoutes = require('./routes/taskRoutes');

const { sequelize, connectToDB } = require('./db/db-connector');

// connectToDB();
// sequelize.sync()

// middleware
app.use(express.json()) 

// routes
app.use('/api/tasks', taskRoutes);

// start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
