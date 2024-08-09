const express = require('express');
const { getTasks, getTaskById, createTask, deleteTask, updateTask } = require('../controllers/taskController')
const ensureLogIn = require('connect-ensure-login').ensureLoggedIn;

const router = express.Router();
const ensureLoggedIn = ensureLogIn();

// router.get('/', getTasks);
// router.get('/:id', getTaskById);
// router.post('/', createTask)
// router.delete('/:id', deleteTask)
// router.put('/:id', updateTask)


router.get('/', ensureLoggedIn, getTasks);
router.get('/:id', ensureLoggedIn, getTaskById);
router.post('/', ensureLoggedIn, createTask)
router.delete('/:id', ensureLoggedIn, deleteTask)
router.put('/:id', ensureLoggedIn, updateTask)

module.exports = router;