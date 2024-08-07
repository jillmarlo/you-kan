const { Project, ProjectUser } = require('../models');

// CRUD for PROJECTS
const getProject = async (req, res) => {
    try {
      //const targetUserId = req.params.userId;
      const requesterUserId = req.query.user_id; // Assuming user ID is passed in query parameters, example" http://localhost:8000/project/user/2?user_id=10
  
  
      // Validate that the requesterUserId is provided
      if (!requesterUserId) {
        return res.status(400).json({ error: 'User ID is required' });
      }
  
      // Check if the requester is allowed to view projects of the target user
      const project = await Project.findOne({
        where: { creator_user_id: requesterUserId }
      });
  
      if (!project) {
        return res.status(404).json({ error: 'No projects found for the user' });
      }
  
      if (project.creator_user_id !== parseInt(requesterUserId, 10)) {
        return res.status(403).json({ error: 'User does not have permission to view these projects' });
      }
  
      // Fetch projects where creator_user_id match requester id
      const projects = await Project.findAll({
        where: { creator_user_id: requesterUserId }
      });
  
      res.json(projects);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  const getProjectById = async (req, res) => {
      try {
        const requesterUserId = req.query.user_id; // Assuming user ID is passed in query parameters , example http://localhost:8000/project/2?user_id=10
        const projectId = req.params.id;
    
        // Validate that the requesterUserId is provided
        if (!requesterUserId) {
          return res.status(400).json({ error: 'User ID is required' });
        }
    
        // Fetch the project to check if it exists and to get the creator_user_id
        const project = await Project.findByPk(projectId);
    
        if (!project) {
          return res.status(404).json({ error: 'Project not found' });
        }
    
        // Check if the requester has permission to view the project
        if (project.creator_user_id !== parseInt(requesterUserId, 10)) {
          return res.status(403).json({ error: 'User does not have permission to view this project' });
        }
    
        // If the user has permission, return the project details
        res.json(project);
    
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
      }
    };
    
  
    const createProject = async (req, res) => {
      const { project_name, creator_user_id } = req.body;
    
      try {
        // Create the project
        const project = await Project.create({
          project_name,
          creator_user_id
        });
    
        // Associate the project with the user
        await ProjectUser.create({
          user_id: creator_user_id,
          project_id: project.project_id
        });
    
        res.status(201).json(project);
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
      }
    };
    
  
  const updateProject = async (req, res) => {
    try {
      const requesterUserId = req.query.user_id; // Assuming user ID is passed in query parameters , example http://localhost:8000/project/11?user_id=2
      const projectId = req.params.id;

      // Validate that the requesterUserId is provided
      if (!requesterUserId) {
        return res.status(400).json({ error: 'User ID is required' });
      }
  
      // Fetch the project to check if it exists and to get the creator_user_id
      const project = await Project.findByPk(projectId);
  
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }
  
      // Check if the requester has permission to view the project
      if (project.creator_user_id !== parseInt(requesterUserId, 10)) {
        return res.status(403).json({ error: 'User does not have permission to view this project' });
      }
  
      const [updated] = await Project.update(req.body, {
        where: { project_id: projectId}
      });
      if (updated) {
        res.json({ message: 'Project updated' });
      } else {
        res.status(404).json({ message: 'Project not found' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  const deleteProject = async (req, res) => {
    try {
      const requesterUserId = req.query.user_id; // Assuming user ID is passed in query parameters , example http://localhost:8000/project/11?user_id=2
      const projectId = req.params.id;
  
      // Validate that the requesterUserId is provided
      if (!requesterUserId) {
        return res.status(400).json({ error: 'User ID is required' });
      }
  
      // Fetch the project to check if it exists and to get the creator_user_id
      const project = await Project.findByPk(projectId);
  
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }
  
      // Check if the requester has permission to view the project
      if (project.creator_user_id !== parseInt(requesterUserId, 10)) {
        return res.status(403).json({ error: 'User does not have permission to view this project' });
      }
  
      // First, delete associated records in the Project_Users table
      await ProjectUser.destroy({
          where: { project_id: projectId }
          });
  
      // Then, delete the project
      const deleted = await Project.destroy({
        where: { project_id: req.params.id }
      });
      if (deleted) {
        res.json({ message: 'Project deleted' });
      } else {
        res.status(404).json({ message: 'Project not found' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };

  module.exports = { getProject, getProjectById, createProject, deleteProject, updateProject };