const { Project } = require('../models');

const isProjectOwner = async (req, res, next) => {
    const userId = req.user.user_id;
    const projectId = req.params.id;

    try {
        const project = await Project.findByPk(projectId);

        if (project.creator_user_id !== userId) {
            return res.status(403).send({ error: 'User must be the owner of this project to modify it.' });
        }

        return next();
    } catch {
        return res.sendStatus(500);
    }

};

module.exports = isProjectOwner