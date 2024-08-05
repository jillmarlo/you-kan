const express = require('express');
const passport = require('passport');
const { registerUser, loginUser, logoutUser } = require('../controllers/authController')

const router = express.Router();

router.post('/register', registerUser);
router.post('/login/password', loginUser);
router.post('/logout', logoutUser);

// Route to get CSRF token
router.get('/csrf-token', (req, res) => {
    console.log(req.csrfToken());
    res.json({ csrfToken: req.csrfToken() });
  });
  

module.exports = router;