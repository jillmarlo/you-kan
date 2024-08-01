/*
    Sets up main server application (middleware, routes)
    Connects to database and starts node.js server
*/
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./db/db-connector');

// THis
const session = require('express-session');
require('./auth');
const passport = require('passport');


require('dotenv').config();

const app = express();

// Express-session middleware
app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.use(bodyParser.json());
// middleware
app.use(express.json()) 



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

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

app.get('/', (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>')
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile' ]})
)

app.get('/protected', isLoggedIn, (req, res) => {
  res.send(`Hello ${req.user.displayName}`)
})

app.get('/google/callback',
  passport.authenticate('google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/failure'
  })
)

app.get('/auth/failure', (req, res) => {
  res.send('something went wrong..')
})

// app.get('/logout', (req, res) => {
//   req.logout();
//   req.session.destroy();
//   res.send('Goodbye!');
// });

/*** LOGOUT A USER ***/
app.get('/logout', (req, res, next) => {
	res.clearCookie('connect.sid');  // clear the session cookie
	req.logout(function(err) {  // logout of passport
		req.session.destroy(function (err) { // destroy the session
			res.send('Logged out'); // send to the client
		});
	});
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;