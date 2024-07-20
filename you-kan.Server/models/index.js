/*
    Wraps all data models into one 'db' object and exports it for use by controller
*/

const { sequelize } = require('../db/db-connector');
const { DataTypes } = require('sequelize');

const User = require('./User')(sequelize, DataTypes);
const Project = require('./Project')(sequelize, DataTypes);
const Sprint = require('./Sprint')(sequelize, DataTypes)
const Task = require('./Task')(sequelize, DataTypes);
const Subtask = require('./Subtask')(sequelize, DataTypes);
const Comment = require('./Comment')(sequelize, DataTypes);

module.exports = { User, Project, Sprint, Task, Subtask, Comment };


