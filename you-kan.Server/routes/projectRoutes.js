const express = require('express');
const { getProject, getProjectById, createProject, deleteProject, updateProject } = require('../controllers/projectController')
const { isProjectOwner } = require('../authMiddleware/isProjectOwner')
const { isProjectCollaborator } = require('../authMiddleware/isProjectCollaborator');

const router = express.Router();

const getProjectIdFromQuery = (req) => req.query.project_id;

router.get('/user/:userId', isProjectCollaborator(getProjectIdFromQuery), getProject);
router.get('/:id', isProjectCollaborator(getProjectIdFromQuery), getProjectById);
router.post('/', isProjectCollaborator(getProjectIdFromQuery), createProject);
router.put('/:id', isProjectCollaborator(getProjectIdFromQuery), isProjectOwner, updateProject);
router.delete('/:id', isProjectCollaborator(getProjectIdFromQuery), isProjectOwner, deleteProject);

module.exports = router;