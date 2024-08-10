const express = require('express');
const { getComments, getCommentById, createComment, deleteComment, updateComment } = require('../controllers/commentController')
const ensureLogIn = require('connect-ensure-login').ensureLoggedIn;

const router = express.Router();
//const ensureLoggedIn = ensureLogIn();

router.get('/', getComments);
router.get('/:id', getCommentById);
router.post('/', createComment)
router.delete('/:id', deleteComment)
router.put('/:id', updateComment)

module.exports = router;