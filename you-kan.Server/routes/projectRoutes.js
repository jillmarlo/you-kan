const express = require('express');
const { getProject, getProjectById, createProject, deleteProject, updateProject } = require('../controllers/projectController')

const router = express.Router();

router.get('/user', getProject);
router.get('/:id', getProjectById);
router.post('/', createProject)
router.put('/:id', updateProject)
router.delete('/:id', deleteProject)

module.exports = router;