const express = require('express');
const { getSprint, getSprintById, createSprint, deleteSprint, updateSprint } = require('../controllers/sprintController')
const { isProjectCollaborator } = require('../authMiddleware/isProjectCollaborator');

const router = express.Router();

const getProjectIdFromQuery = (req) => req.query.project_id;

const getProjectIdFromBody = (req) => req.body.project_id;

const getProjectIdFromSprint = async (req) => {
    const sprintId = req.params.id;
    const sprint = await Comment.findByPk(sprintId);
    return sprint ? sprint.project_id : null;
}

router.get('/project/:projectId', isProjectCollaborator(getProjectIdFromQuery), getSprint);
router.get('/:id', isProjectCollaborator(getProjectIdFromSprint), getSprintById);
router.post('/', isProjectCollaborator(getProjectIdFromBody), createSprint);
router.put('/:id', isProjectCollaborator(getProjectIdFromSprint), updateSprint)
router.delete('/:id', isProjectCollaborator(getProjectIdFromSprint), deleteSprint)

module.exports = router;