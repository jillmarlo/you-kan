const { User } = require('../models');
const bcrypt = require('bcrypt');

// CRUD for USER
const registerUser = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create new user with hashed password
    const newUser = await User.create({
      first_name,
      last_name,
      email,
      password_hash: password // This will be hashed by the model's beforeCreate hook
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Compare password with stored hash
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Successfully logged in
    res.json({ message: 'Login successful', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const getUsers = async (req, res) => {
    try {
      const users = await User.findAll();
      res.json({ message: 'All user data', data: users });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
 const getUserById = async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (user) {
        res.json({ message: 'Get single data', data: user });
      } else {
        res.status(404).json({ message: 'Data not found' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
 const createUser = async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.json({ message: 'Data inserted', data: user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  const updateUser = async (req, res) => {
    try {
      const [updated] = await User.update(req.body, {
        where: { user_id: req.params.id }
      });
      if (updated) {
        res.json({ message: 'Data updated' });
      } else {
        res.status(404).json({ message: 'Data not found' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  const deleteUser = async (req, res) => {
    try {
      const deleted = await User.destroy({
        where: { user_id: req.params.id }
      });
      if (deleted) {
        res.json({ message: 'Data deleted' });
      } else {
        res.status(404).json({ message: 'Data not found' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };

  module.exports = { registerUser, loginUser, getUsers, getUserById, createUser, updateUser, deleteUser };