const { Sprint, Project, User } = require('../models');

const getSprint = async (req, res) => {
    try {
        const targetProjectId = req.params.projectId; 
        const requesterProjectId = req.query.project_id; // Assuming project ID is passed in query, example: "http://localhost:8000/api/sprints/project/3?project_id=3"

        // Validate that the requesterProjectId is provided
        if (!requesterProjectId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        // Check if the requester is allowed to view sprints of the target project
        const sprint = await Sprint.findOne({
            where: { project_id: targetProjectId }
        });

        if (!sprint) {
            return res.status(404).json({ error: 'No sprint found' });
        }

        if (sprint.project_id !== parseInt(requesterProjectId, 10)) {
            return res.status(403).json({ error: 'User does not have permission to view these sprints' });
        }

        // Fetch sprints where project_id matches targetProjectId
        const sprints = await Sprint.findAll({
            where: { project_id: targetProjectId }
        });

        res.json(sprints);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

const getSprintById = async (req, res) => {
    try {
        // const requesterUserId = req.query.user_id; // Assuming user ID is passed in query parameters, example:"http://localhost:8000/api/sprints/1?user_id=10"
        const sprintId = req.params.id;

        // // Validate that the requesterUserId is provided
        // if (!requesterUserId) {
        //     return res.status(400).json({ error: 'User ID is required' });
        // }

        // Fetch the sprint to check if it exists and to get the project_id
        const sprint = await Sprint.findByPk(sprintId);

        if (!sprint) {
            return res.status(404).json({ error: 'Sprint not found' });
        }

        // // Fetch the associated project to get the creator_user_id
        // const project = await Project.findByPk(sprint.project_id);

        // // Check if the requester has permission to view the sprint
        // if (project.creator_user_id !== parseInt(requesterUserId, 10)) {
        //     return res.status(403).json({ error: 'User does not have permission to view this sprint' });
        // }

        // If the user has permission, return the sprint details
        res.json(sprint);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

const createSprint = async (req, res) => {
    const { sprint_name, project_id, start_date, end_date } = req.body;

    try {
        // Fetch the project to check if it exists
        const project = await Project.findByPk(project_id);

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        // Create the sprint
        const sprint = await Sprint.create({
            sprint_name,
            project_id,
            start_date,
            end_date
        });

        res.status(201).send('Sprint created successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

const updateSprint = async (req, res) => {
    try {

        /*
            TODO: fetch associated project to get all users that is on the project
        */
        const requesterUserId = req.query.user_id; // Assuming user ID is passed in query parameters, example: http://localhost:8000/api/sprints/2?user_id=10
        const sprintId = req.params.id;

        // Validate that the requesterUserId is provided
        if (!requesterUserId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        // Fetch the sprint to check if it exists and to get the project_id
        const sprint = await Sprint.findByPk(sprintId);

        if (!sprint) {
            return res.status(404).json({ error: 'Sprint not found' });
        }

        // Fetch the associated project to get the creator_user_id
        const project = await Project.findByPk(sprint.project_id);

        // Check if the requester has permission to update the sprint
        if (project.creator_user_id !== parseInt(requesterUserId, 10)) {
            return res.status(403).json({ error: 'User does not have permission to update this sprint' });
        }

        const [updated] = await Sprint.update(req.body, {
            where: { sprint_id: sprintId }
        });
        if (updated) {
            res.json({ message: 'Sprint updated' });
        } else {
            res.status(404).json({ message: 'Sprint not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

const deleteSprint = async (req, res) => {

    /*
        TODO: fetch associated project to get all users that is on the project
        - change any task FK associated to this sprint changed?
    */
    try {
        const requesterUserId = req.query.user_id; // Assuming user ID is passed in query parameters, example" http://localhost:8000/sprints/2?user_id=10
        const sprintId = req.params.id;

        // Validate that the requesterUserId is provided
        if (!requesterUserId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        // Fetch the sprint to check if it exists and to get the project_id
        const sprint = await Sprint.findByPk(sprintId);

        if (!sprint) {
            return res.status(404).json({ error: 'Sprint not found' });
        }

        // Fetch the associated project to get the creator_user_id
        const project = await Project.findByPk(sprint.project_id);

        // Check if the requester has permission to delete the sprint
        if (project.creator_user_id !== parseInt(requesterUserId, 10)) {
            return res.status(403).json({ error: 'User does not have permission to delete this sprint' });
        }

        // Delete the sprint
        const deleted = await Sprint.destroy({
            where: { sprint_id: sprintId }
        });
        if (deleted) {
            res.json({ message: 'Sprint deleted' });
        } else {
            res.status(404).json({ message: 'Sprint not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};


module.exports = { getSprint, getSprintById, createSprint, updateSprint, deleteSprint };