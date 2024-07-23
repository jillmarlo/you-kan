const { DataTypes } = require('sequelize');
const sequelize = require('../db/db-connector');

const ProjectUser = sequelize.define('ProjectUser', {
    user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'user_id'
        },
        primaryKey: true
      },
      project_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Projects',
          key: 'project_id'
        },
        primaryKey: true
      }
    },
{
    sequelize,
    timestamps: false,
    modelName: 'ProjectUser',
    tableName: 'Project_Users' // Ensure this matches your table name
  });


module.exports = ProjectUser;
