/*
    Instantiates models and exports for use by controllers
*/

const { sequelize } = require('../db/db-connector');
const { DataTypes } = require('sequelize');

const User = require('./User.model')(sequelize, DataTypes);
const Project = require('./Project.model')(sequelize, DataTypes);
const Sprint = require('./Sprint.model')(sequelize, DataTypes)
const Task = require('./Task.model')(sequelize, DataTypes);
const Subtask = require('./Subtask.model')(sequelize, DataTypes);
const Comment = require('./Comment.model')(sequelize, DataTypes);

module.exports = { User, Project, Sprint, Task, Subtask, Comment };


