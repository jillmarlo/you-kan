const express = require('express');
const { getComments, getCommentById, createComment, deleteComment, updateComment } = require('../controllers/commentController')

const router = express.Router();

router.get('/', getComments);
router.get('/:id', getCommentById);
router.post('/', createComment)
router.delete('/:id', deleteComment)
router.put('/:id', updateComment)

module.exports = router;