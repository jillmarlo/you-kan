const express = require('express');
const { getComments, getCommentById, createComment, deleteComment, updateComment } = require('../controllers/commentController')
const { isCommentOwner } = require('../authMiddleware/isCommentOwner');
const { isProjectCollaborator } = require('../authMiddleware/isProjectCollaborator');
const { Task, Comment } = require('../models');

const router = express.Router();

const getProjectIdFromQuery = (req) => req.query.project_id;

const getProjectIdFromComment = async (req) => {
    const commentId = req.params.id;
    const comment = await Comment.findByPk(commentId);

    if (comment) {
        const task = await Task.findByPk(comment.task_id);
        return task ? task.project_id : null;
    }
    return null;
}

const getProjectIdFromTaskInBody = async (req) => {
    const taskId = req.body.task_id;
    const task = await Task.findByPk(taskId);
    return task ? task.project_id : null;
};

router.get('/', isProjectCollaborator(getProjectIdFromQuery), getComments);
router.get('/:id', isProjectCollaborator(getProjectIdFromComment), getCommentById);
router.post('/', isProjectCollaborator(getProjectIdFromTaskInBody), createComment);
router.delete('/:id', isProjectCollaborator(getProjectIdFromComment), isCommentOwner, deleteComment);
router.put('/:id', isProjectCollaborator(getProjectIdFromComment), isCommentOwner, updateComment);

module.exports = router;