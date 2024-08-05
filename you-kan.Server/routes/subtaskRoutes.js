const express = require('express');
const { getSubtasks, getSubtaskById, createSubtask, deleteSubtask, updateSubtask } = require('../controllers/subtaskController');
const { isProjectCollaborator } = require('../authMiddleware/isProjectCollaborator');
const { Task, Subtask } = require('../models');

const router = express.Router();

const getProjectIdFromQuery = (req) => req.query.project_id;

const getProjectIdFromSubtask = async (req) => {
    const subtaskId = req.params.id;
    const subtask = await Subtask.findByPk(subtaskId);

    if (subtask) {
        const task = await Task.findByPk(subtask.task_id);
        return task ? task.project_id : null;
    }
    return null;
}

const getProjectIdFromTaskInBody = async (req) => {
    const taskId = req.body.task_id;
    const task = await Task.findByPk(taskId);
    return task ? task.project_id : null;
};


router.get('/', isProjectCollaborator(getProjectIdFromQuery), getSubtasks);
router.get('/:id', isProjectCollaborator(getProjectIdFromSubtask), getSubtaskById);
router.post('/', isProjectCollaborator(getProjectIdFromTaskInBody), createSubtask)
router.delete('/:id', isProjectCollaborator(getProjectIdFromSubtask), deleteSubtask)
router.put('/:id', isProjectCollaborator(getProjectIdFromSubtask), updateSubtask)

module.exports = router;