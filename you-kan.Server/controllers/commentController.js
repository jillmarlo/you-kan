const { Comment } = require('../models');

const getComments = async (req, res) => {
    console.log(req.query)

    const { task_id } = req.query;

    const where = {};
    if (task_id) where.task_id = task_id;

    const queryOptions = { where };

    let comments;
    try {
        comments = await Comment.findAll(queryOptions);
    } catch {
        return res.sendStatus(500);
    }

    if (!comments) {
        return res.sendStatus(404);
    }
    return res.status(200).json(comments);
}

const getCommentById = async (req, res) => {
    let comment;
    try {
        comment = await Comment.findByPk(req.params.id);
    } catch {
        return res.sendStatus(500);
    }

    if (!comment) {
        return res.sendStatus(404);
    }
    return res.status(200).json(comment);
}

const createComment = async (req, res) => {
    const commentBody = { ...req.body, created_at: new Date().toISOString() };

    let newComment;
    try {
        newComment = await Comment.create(commentBody);
    } catch {
        return res.sendStatus(500);
    }

    if (!newComment) {
        return res.sendStatus(404);
    }
    return res.status(201).json(newComment);
}

const deleteComment = async (req, res) => {
    const queryOptions = { where: { comment_id: req.params.id } };

    let rowsDeleted;
    try {
        rowsDeleted = await Comment.destroy(queryOptions);
    } catch {
        return res.sendStatus(500);
    }

    if (rowsDeleted == 0) {
        return res.sendStatus(404);
    } 
    return res.sendStatus(204);
}

const updateComment = async (req, res) => {
    const comment_id = req.params.id;
    const commentBody = req.body;

    let comment;
    try {
        comment = await Comment.findByPk(comment_id);
    } catch {
        return res.sendStatus(500);
    }

    if (!comment) {
        return res.sendStatus(404);
    }

    let updatedComment;
    try {
        updatedComment = await comment.update(commentBody);
    } catch (error) {
        return res.sendStatus(500);
    }

    return res.status(200).json(updatedComment);
}

module.exports = { getComments, getCommentById, createComment, deleteComment, updateComment }
