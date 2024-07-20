const express = require('express');
const { getTasks, getTaskById, createTask, deleteTask, updateTask } = require('../controllers/taskController')

const router = express.Router();

router.get('/', getTasks);
router.get('/:id', getTaskById);
router.post('/', createTask)
router.delete('/:id', deleteTask)
router.put('/:id', updateTask)

module.exports = router;