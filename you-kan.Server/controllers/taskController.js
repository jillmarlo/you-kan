const { Task, Sprint, Task_Assignee } = require('../models');

const executeSequelizeOperation = async (model, operation, options) => {
    try {
        const result = await model[operation](...options);
        return { status: 200, data: result };
    } catch (error) {
        console.error(error);

        if (error instanceof Sequelize.ValidationError || error instanceof Sequelize.DatabaseError) {
            return { status: 400, data: null };
        } else {
            return { status: 500, data: null };
        }
    }
};

const getTasks = async (req, res) => {
    const { project_id, user_id, sprint_id, status, priority, sort } = req.query;

    const include = [];
    if (project_id) {
        include.push({
            model: Sprint,
            where: { project_id }
        });
    }

    if (user_id) {
        include.push({
            model: Task_Assignee,
            where: { user_id }
        });
    }

    const where = {}
    if (sprint_id) where.sprint_id = sprint_id;
    if (status) where.status = status;
    if (priority) where.priority = priority;

    const order = []
    if (sort) {
        order.push(sort.split(':')) // assumes only 1 sort query param for now
    }

    const queryOptions = { where, include, order };
    const { responseStatus, data } = await executeSequelizeOperation(Task, 'findAll', queryOptions);

    if (responseStatus == 200) res.status(responseStatus).json(data)
    else res.status(responseStatus);
}

const getTaskById = async (req, res) => {
    const { responseStatus, data } = await executeSequelizeOperation(Task, 'findByPk', req.params.task_id);

    if (responseStatus == 200) res.status(responseStatus).json(data)
    else res.status(responseStatus);
}

const createTask = async (req, res) => {
    const taskBody = { ...req.body, created_at: new Date().toISOString() };
    const { responseStatus, data } = await executeSequelizeOperation(Task, 'create', taskBody);

    if (responseStatus == 200) res.status(201).json(data);
    else res.status(responseStatus);
}

const deleteTask = async (req, res) => {
    const queryOptions = { where: { task_id: req.params.task_id } };
    const { responseStatus, data } = await executeSequelizeOperation(Task, 'destroy', queryOptions);

    if (responseStatus == 200) res.status(204).json(data);
    else res.status(responseStatus);
}

const updateTask = async (req, res) => {
    const queryOptions = { where: { task_id: req.params.task_id } };
    const taskBody = req.body;

    const { status: responseStatus, data: [rowsUpdated, [updatedTask]] } = await executeSequelizeOperation(Task, 'update', taskBody, queryOptions);
    if (responseStatus == 200) res.status(204).json(data);
    else res.status(responseStatus);
};

module.exports = { getTasks, getTaskById, createTask, deleteTask, updateTask }