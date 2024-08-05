const { ProjectUser } = require('../models');

const isProjectCollaborator = (getProjectId) => {
    return async (req, res, next) => {
        const userId = req.user.user_id;
        const projectId = await getProjectId(req);

        try {
            const userProject = await ProjectUser.findOne({
                where: {
                    user_id: userId,
                    project_id: projectId
                }
            });

            if (userProject) {
                return next();
            }

            return res.status(403).send({ error: 'User must be a collaborator of this project to access it.' });

        } catch {
            return res.sendStatus(500);
        }
    }
}

module.exports = isProjectCollaborator