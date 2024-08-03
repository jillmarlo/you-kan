const sequelize = require('./db/db-connector');
const app = require('./app.js');

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

const PORT = process.env.NODE_ENV === 'test' ? 0 : 9000; // use random port number if running tests in parallel to avoid port conflicts 

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});