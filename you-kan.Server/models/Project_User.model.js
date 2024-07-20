module.exports = (sequelize, DataTypes) => {
    const ProjectUser = sequelize.define('ProjectUser', {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      project_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
    }, {
      tableName: 'Project_Users',
      timestamps: false,
    });
  
    return ProjectUser;
  };
  