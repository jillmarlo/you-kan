const { Task, Sprint, Task_Assignee, User } = require('../models');
const { Sequelize } = require('sequelize');

const getTasks = async (req, res) => {
    const { project_id, user_id, sprint_id, status, priority, sort } = req.query;

    if (!user_id) {
        return res.sendStatus(400).json({ error: 'User ID must be specified in the query parameters.' });
    }

    const include = [];    

    include.push({
        model: User,
        where: { user_id }
    });


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

    console.log(queryOptions);

    let task;
    try {
        task = await Task.findAll(queryOptions);
    } catch(error) {
        console.log(error)
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
        res.status(200).json(task);
    }
}

const createTask = async (req, res) => {
    const taskBody = { ...req.body, created_at: new Date().toISOString() };
    const userRequesterId = req.user.user_id;

    if (taskBody.sprint_id === undefined) {
        taskBody.sprint_id = null; // Set sprint_id to null if not provided
    }

    try {
        const newTask = await Task.create(taskBody);
        await Task_Assignee.create({
            user_id: userRequesterId, 
            task_id: newTask.task_id
        });
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


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