const { DataTypes } = require('sequelize');
const sequelize = require('../db/db-connector');

const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false,
  tableName: 'Users',
});

User.associate = (models) => {
    User.belongsToMany(models.Project, {
      through: models.ProjectUser,
      foreignKey: 'user_id',
      otherKey: 'project_id'
    });
  };

module.exports = User;