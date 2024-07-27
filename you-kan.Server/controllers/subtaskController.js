const { Subtask } = require('../models');

const getSubtasks = async (req, res) => {
    const { task_id } = req.query;

    const where = {};
    if (task_id) where.task_id = task_id;

    const queryOptions = { where };

    let subtasks;
    try {
        subtasks = await Subtask.findAll(queryOptions);
    } catch {
        return res.sendStatus(500);
    }

    if (!subtasks) {
        return res.sendStatus(404);
    }
    return res.status(200).json(subtasks);
}

const getSubtaskById = async (req, res) => {
    let subtask;
    try {
        subtask = await Subtask.findByPk(req.params.id);
    } catch {
        return res.sendStatus(500);
    }

    if (!subtask) {
        return res.sendStatus(404);
    }
    return res.status(200).json(subtask);
}

const createSubtask = async (req, res) => {
    const subtaskBody = { ...req.body, created_at: new Date().toISOString() };

    let newSubtask;
    try {
        newSubtask = await Subtask.create(subtaskBody);
    } catch {
        return res.sendStatus(500);
    }

    if (!newSubtask) {
        return res.sendStatus(404);
    }
    return res.status(201).json(newSubtask);
}

const deleteSubtask = async (req, res) => {
    const queryOptions = { where: { subtask_id: req.params.id } };

    let rowsDeleted;
    try {
        rowsDeleted = await Subtask.destroy(queryOptions);
    } catch {
        return res.sendStatus(500);
    }

    if (rowsDeleted == 0) {
        return res.sendStatus(404);
    } 
    return res.sendStatus(204);
}

const updateSubtask = async (req, res) => {
    const subtask_id = req.params.id;
    const subtaskBody = req.body;

    let subtask;
    try {
        subtask = await Subtask.findByPk(subtask_id);
    } catch {
        return res.sendStatus(500);
    }

    if (!subtask) {
        return res.sendStatus(404);
    }

    let updatedSubtask;
    try {
        updatedSubtask = await subtask.update(subtaskBody);
    } catch (error) {
        return res.sendStatus(500);
    }

    return res.status(200).json(updatedSubtask);
}

module.exports = { getSubtasks, getSubtaskById, createSubtask, deleteSubtask, updateSubtask }
