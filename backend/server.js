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

// const taskRoutes = require('./routes/taskRoutes');
const projectRoutes = require('./routes/projectRoutes')
const userRoutes = require('./routes/userRoutes')

console.log('userRoutes type:', typeof userRoutes); // Should be 'function'

// routes
// app.use('/api/tasks', taskRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/users', userRoutes);


app.listen(8000, () => {
  console.log('Server listening on port 8000...');
});