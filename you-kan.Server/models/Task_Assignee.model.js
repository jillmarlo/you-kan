module.exports = (sequelize, DataTypes) => {
    const TaskAssignee = sequelize.define('TaskAssignee', {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      task_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
    }, {
      tableName: 'Task_Assignees',
      timestamps: false,
    });
  
    return TaskAssignee;
  };
  