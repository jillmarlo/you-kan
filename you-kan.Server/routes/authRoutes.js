const express = require('express');
const passport = require('passport');
const { registerUser, loginUser, logoutUser } = require('../controllers/authController')
const ensureLogIn = require('connect-ensure-login').ensureLoggedIn;

const router = express.Router();
const ensureLoggedIn = ensureLogIn();

router.post('/register', registerUser);
router.post('/login/password', loginUser);
router.post('/logout', logoutUser);

// Route to get CSRF token
router.get('/csrf-token', (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
  });

// Check if the user is authenticated
router.get('/is-authenticated', ensureLoggedIn, (req, res) => {
  res.json({ authenticated: true });
});
  

module.exports = router;