const express = require('express');
const { getTasks, getTaskById, createTask, deleteTask, updateTask } = require('../controllers/taskController');
const { isProjectCollaborator } = require('../authMiddleware/isProjectCollaborator');

const router = express.Router();

const getProjectIdFromQuery = (req) => req.query.project_id;

const getProjectIdFromBody = (req) => req.body.project_id;

const getProjectIdFromTask = async (req) => {
    const taskId = req.params.id;
    const task = await Comment.findByPk(taskId);
    return task ? task.project_id : null;
}

router.get('/', isProjectCollaborator(getProjectIdFromQuery), getTasks);
router.get('/:id', isProjectCollaborator(getProjectIdFromTask), getTaskById);
router.post('/', isProjectCollaborator(getProjectIdFromBody), createTask)
router.delete('/:id', isProjectCollaborator(getProjectIdFromTask), deleteTask)
router.put('/:id', isProjectCollaborator(getProjectIdFromTask), updateTask)

module.exports = router;