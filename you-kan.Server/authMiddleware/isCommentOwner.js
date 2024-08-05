const { Comment } = require('../models');

const isProjectOwner = async (req, res, next) => {
    const userId = req.user.user_id;
    const commentId = req.params.id;

    try {
        const comment = await Comment.findByPk(commentId);

        if (comment.user_id !== userId) {
            return res.status(403).send({ error: 'User must be the owner of this comment to modify it.' });
        }
        return next();

    } catch {
        return res.sendStatus(500);
    }
};

module.exports = isProjectOwner