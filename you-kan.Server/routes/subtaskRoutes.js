const express = require('express');
const { getSubtasks, getSubtaskById, createSubtask, deleteSubtask, updateSubtask } = require('../controllers/subtaskController')

const router = express.Router();

router.get('/', getSubtasks);
router.get('/:id', getSubtaskById);
router.post('/', createSubtask)
router.delete('/:id', deleteSubtask)
router.put('/:id', updateSubtask)

module.exports = router;