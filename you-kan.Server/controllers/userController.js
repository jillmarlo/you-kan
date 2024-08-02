const { User } = require('../models');
// const bcrypt = require('bcrypt');

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

  module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };