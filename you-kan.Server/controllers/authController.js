const { User } = require('../models');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Configure password authentication strategy.
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return done(null, false, { message: 'Incorrect email or password.' });
      }
      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect email or password.' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

// Configure session management.
passport.serializeUser((user, done) => {
    done(null, user.user_id);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findByPk(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

// Login
const loginUser = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }
      req.login(user, (err) => {
        if (err) return next(err);
        res.json({ message: 'Login successful', user });
      });
    })(req, res, next);
  };

  // Register
const registerUser = async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
  
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }
  
      // Create new user with hashed password
      const newUser = await User.create({
        first_name,
        last_name,
        email,
        password_hash: password // This will be hashed by the model's beforeCreate hook
      });

          // Log in the user
    req.login(newUser, (err) => {
        if (err) {
        console.error(err);
        return next(err);
        }
        res.status(201).json({ message: 'Registration successful', user: newUser });
    });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };

  // Logout
const logoutUser = (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Logout failed' });
        }
        // Destroy the session
        req.session.destroy((err) => {
          if (err) {
            return res.status(500).json({ error: 'Session destruction failed' });
          }
          
          res.clearCookie('connect.sid'); // Clear session cookie
          res.json({ message: 'Logout successful' });
        });
    });
};

  module.exports = { registerUser, loginUser, logoutUser };