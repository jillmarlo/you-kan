const bcrypt = require('bcrypt');
const saltRounds = 10; // Adjust this value to increase/decrease hashing time

module.exports = (sequelize, DataTypes) => {
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
  tableName: 'Users'
});

// Hash password before saving to database
User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(saltRounds);
  user.password_hash = await bcrypt.hash(user.password_hash, salt);
});

return User;
}
