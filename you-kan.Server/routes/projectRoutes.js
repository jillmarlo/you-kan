const express = require('express');
const { getProject, getProjectById, createProject, deleteProject, updateProject } = require('../controllers/projectController')
const ensureLogIn = require('connect-ensure-login').ensureLoggedIn;

const router = express.Router();
const ensureLoggedIn = ensureLogIn();

router.get('/', ensureLoggedIn, getProject);
router.get('/:id', ensureLoggedIn, getProjectById);
router.post('/', ensureLoggedIn, createProject)
router.put('/:id', ensureLoggedIn, updateProject)
router.delete('/:id', ensureLoggedIn, deleteProject)

module.exports = router;