// /server/controllers/usersController.js

const db = require('../models/db');



exports.getAllUsers = async (req, res) => {
  try {
    const [rows, fields] = await db.query('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    console.error('Error executing MySQL query: ', err);
    res.status(500).send('Internal Server Error');
  }
};

exports.getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const [rows, fields] = await db.query('SELECT * FROM users WHERE user_id = ?', [userId]);

    if (rows.length === 0) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.json(rows[0]);
    }
  } catch (err) {
    console.error('Error executing MySQL query: ', err);
    res.status(500).send('Internal Server Error');
  }
};

exports.getUserTasks = async (req, res) => {
  const userId = req.params.id;

  try {
    const [rows, fields] = await db.query(
      'SELECT tasks.* FROM tasks JOIN task_users ON tasks.id_task = task_users.task_id WHERE task_users.user_id = ?',
      [userId]
    );

    res.json(rows);
  } catch (err) {
    console.error('Error executing MySQL query: ', err);
    res.status(500).send('Internal Server Error');
  }
};

exports.createUser = async (req, res) => {
  const { user_name, user_password } = req.body;

  try {
    // Check if the username already exists
    const [existingUser] = await db.query('SELECT user_id FROM users WHERE user_name = ?', [user_name]);

    if (existingUser.length > 0) {
      // Username already exists, send an appropriate message
      return res.status(400).json({ error: 'Username already exists' });
    }

    // If the username is unique, proceed with the insertion
    const [result] = await db.query('INSERT INTO users (user_name, user_password) VALUES (?, ?)', [user_name, user_password]);
    const insertedUserId = result.insertId;

    res.status(201).json({ id: insertedUserId, user_name, user_password });
  } catch (err) {
    console.error('Error executing MySQL query: ', err);
    res.status(500).send('Internal Server Error');
  }
};

exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const { user_name, user_password } = req.body;

  try {
    const [result] = await db.query('UPDATE users SET user_name = ?, user_password = ? WHERE id_user = ?', [
      user_name,
      user_password,
      userId,
    ]);

    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.json({ id: userId, user_name, user_password });
    }
  } catch (err) {
    console.error('Error executing MySQL query: ', err);
    res.status(500).send('Internal Server Error');
  }
};


exports.checkUserCredentials = async (req, res) => {
  const { user_name, user_password } = req.body;

  try {
    const [rows, fields] = await db.query('SELECT * FROM users WHERE user_name = ? AND user_password = ?', [user_name, user_password]);

    if (rows.length === 0) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.send(rows[0]);
    }
  } catch (err) {
    console.error('Error executing MySQL query: ', err);
    res.status(500).send('Internal Server Error');
  }
};
