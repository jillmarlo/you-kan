module.exports = (sequelize, DataTypes) => {
    const Subtask = sequelize.define('Subtask', {
      subtask_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      subtask_description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      task_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }, {
      tableName: 'Subtasks',
      timestamps: false,
    });
  
    return Subtask;
  };
  