const express = require('express');
const { getProject, getProjectById, createProject, deleteProject, updateProject, getCollaborator, addCollaborator, removeCollaborator } = require('../controllers/projectController')
const ensureLogIn = require('connect-ensure-login').ensureLoggedIn;

const router = express.Router();
//const ensureLoggedIn = ensureLogIn();

router.get('/', getProject);
router.get('/:id', getProjectById);
router.post('/', createProject)
router.put('/:id', updateProject)
router.delete('/:id', deleteProject)

router.get('/collaborators/:id', getCollaborator);
router.post('/collaborators/:id', addCollaborator);
router.delete('/collaborators/:id', removeCollaborator);

module.exports = router;