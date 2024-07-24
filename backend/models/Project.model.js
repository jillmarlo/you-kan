const { DataTypes } = require('sequelize');
const sequelize = require('../db/db-connector');
const User = require('./User.model');

const Project = sequelize.define('Project', {
  project_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  project_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  creator_user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  timestamps: false,
  tableName: 'Projects',
});

Project.belongsTo(User, { foreignKey: 'creator_user_id' });

Project.associate = (models) => {
    Project.belongsToMany(models.User, {
      through: models.ProjectUser,
      foreignKey: 'project_id',
      otherKey: 'user_id'
    });
  };

module.exports = Project;