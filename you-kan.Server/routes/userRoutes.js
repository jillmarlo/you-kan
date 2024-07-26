const express = require('express');
const { registerUser, loginUser, getUsers, getUserById, createUser, deleteUser, updateUser } = require('../controllers/userController')

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

module.exports = router;