const express = require('express');
const { getSprint, getSprintById, createSprint, deleteSprint, updateSprint } = require('../controllers/sprintController')

const router = express.Router();

router.get('/project/:projectId', getSprint);
router.get('/:id', getSprintById);
router.post('/', createSprint)
router.put('/:id', updateSprint)
router.delete('/:id', deleteSprint)

module.exports = router;