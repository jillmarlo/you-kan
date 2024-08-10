const express = require('express');
const { getUsers, getUserById, deleteUser, updateUser } = require('../controllers/userController')
// const ensureLogIn = require('connect-ensure-login').ensureLoggedIn;

const router = express.Router();
 // const ensureLoggedIn = ensureLogIn();

router.get('/',  getUsers); // most likely dont need route, nice to have for checking loggedin
router.get('/:id', getUserById);// most likely dont need route, nice to have for checking loggedin
// router.put('/admin', updateUser);
router.put('/:id', updateUser);
// router.delete('/admin', deleteUser);
router.delete('/:id', deleteUser);

module.exports = router;