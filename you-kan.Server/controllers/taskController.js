const { Task } = require('../models');

// TODO: handle 404 by catching sequelize validation error
const getTasks = async (req, res) => {
    const { project_id, user_id, sprint_id, status, priority, sort } = req.query;

    const where = {}
    if (project_id) where.project_id = project_id;
    if (user_id) where.user_id = user_id;
    if (sprint_id) where.sprint_id = sprint_id;
    if (status) where.status = status;
    if (priority) where.priorty = priority;

    order = []
    if (sort) {
        order.push(sort.split(':')) // assumes only 1 sort query param for now
    }

    const tasks = await Task.findAll({
        where,
        order
    });

    res.status(200).json(tasks);
}

const getTaskById = async (req, res) => {
    const { id } = req.query;
    const task = await Task.findOne({ where: {task_id: id} });

    res.status(200).json(task)
}

const createTask = async (req, res) => {
    const taskBody = {...req.body, created_at: new Date().toISOString()};
    const newTask = await Task.create(taskBody);

    res.status(200).json(newTask);
}

const deleteTask = async (req, res) => {

}

const updateTask = async (req, res) => {

}

module.exports = { getTasks, getTaskById, createTask, deleteTask, updateTask }