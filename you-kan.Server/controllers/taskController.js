const { Task, Sprint, Task_Assignee } = require('../models');
const { Sequelize } = require('sequelize');

const getTasks = async (req, res) => {
    const { project_id, user_id, sprint_id, status, priority, sort } = req.query;

    const include = [];
    if (user_id) {
        include.push({
            model: Task_Assignee,
            where: { user_id }
        });
    }

    const where = {};
    if (project_id) where.project_id = project_id;
    if (sprint_id) where.sprint_id = sprint_id;
    if (status) where.status = status;
    if (priority) where.priority = priority;
    
    const order = [];
    if (sort) {
        order.push(sort.split(':')) // assumes only 1 sort query param for now
    }

    const queryOptions = { where, include, order };

    let task;
    try {
        task = await Task.findAll(queryOptions);
    } catch {
        return res.sendStatus(500);
    }

    if (!task) {
        return res.sendStatus(404);
    } else {
        res.status(200).json(task);
    }
}

const getTaskById = async (req, res) => {
    let task;
    try {
        task = await Task.findByPk(req.params.id);
    } catch {
        return res.sendStatus(500);
    }

    if (!task) {
        return res.sendStatus(404);
    } else {
        return res.status(200).json(task);
    }
}

const createTask = async (req, res) => {
    const taskBody = { ...req.body, created_at: new Date().toISOString() };

    let newTask;
    try {
        newTask = await Task.create(taskBody);
    } catch(error) {
        console.error('Error creating task:', error);

        return res.sendStatus(500).json({ error: error.message });
    }

    if (!newTask) {
        return res.sendStatus(404);
    } else {
        res.status(201).json(newTask);
    }
}

const deleteTask = async (req, res) => {
    const queryOptions = { where: { task_id: req.params.id } };

    let rowsDeleted;
    try {
        rowsDeleted = await Task.destroy(queryOptions);
    } catch {
        return res.sendStatus(500);
    }

    if (rowsDeleted == 0) {
        return res.sendStatus(404);
    } else {
        return res.sendStatus(204);
    }
}

const updateTask = async (req, res) => {
    const task_id = req.params.id;
    const taskBody = req.body;

    let task;
    try {
        task = await Task.findByPk(task_id);
    } catch {
        return res.sendStatus(500);
    }

    if (!task) {
        return res.sendStatus(404);
    }

    let updatedTask;
    try {
        updatedTask = await task.update(taskBody);
    } catch (error) {
        return res.sendStatus(500);
    }

    return res.status(200).json(updatedTask);
}

module.exports = { getTasks, getTaskById, createTask, deleteTask, updateTask }