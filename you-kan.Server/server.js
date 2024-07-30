/*
    Sets up main server application (middleware, routes)
    Connects to database and starts node.js server
*/
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./db/db-connector');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
// middleware
app.use(express.json()) 

// const session = require('express-session');

// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: true,
// }));

// Check database connection and sync models
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

sequelize.sync()
  .then(() => console.log('Models synchronized...'))
  .catch(err => console.log('Error: ' + err));

const taskRoutes = require('./routes/taskRoutes');
const projectRoutes = require('./routes/projectRoutes')
const userRoutes = require('./routes/userRoutes')
const sprintRoutes = require('./routes/sprintRoutes')
const subtaskRoutes = require('./routes/subtaskRoutes')
const commentRoutes = require('./routes/commentRoutes')

// routes
app.use('/api/tasks', taskRoutes);
app.use('/api/subtasks', subtaskRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/users', userRoutes);
app.use('/api/sprints', sprintRoutes);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;