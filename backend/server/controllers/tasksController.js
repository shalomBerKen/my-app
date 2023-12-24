// /server/controllers/tasksController.js

const db = require('../models/db');
const usersCommunitiesController = require('./usersCommunitiesController');

exports.getAllTasks = async (req, res) => {
  try {
    const [rows, fields] = await db.query('SELECT * FROM tasks');
    res.json(rows);
  } catch (err) {
    console.error('Error executing MySQL query: ', err);
    res.status(500).send('Internal Server Error');
  }
};

exports.getTaskById = async (req, res) => {
  const taskId = req.params.id;

  try {
    const [rows, fields] = await db.query('SELECT * FROM tasks WHERE id_task = ?', [taskId]);

    if (rows.length === 0) {
      res.status(404).json({ message: 'Task not found' });
    } else {
      res.json(rows[0]);
    }
  } catch (err) {
    console.error('Error executing MySQL query: ', err);
    res.status(500).send('Internal Server Error');
  }
};

exports.getTaskUsers = async (req, res) => {
  const taskId = req.params.id;

  try {
    const [rows, fields] = await db.query(
      'SELECT users.* FROM users JOIN task_users ON users.id_user = task_users.user_id WHERE task_users.task_id = ?',
      [taskId]
    );

    res.json(rows);
  } catch (err) {
    console.error('Error executing MySQL query: ', err);
    res.status(500).send('Internal Server Error');
  }
};


exports.createTask = async (req, res) => {
  const { task_name, task_details, task_date, is_done, user_id, received_approv } = req.body;

  try {
    // Begin a transaction
    await db.beginTransaction();

    // Step 1: Insert into tasks table
    const [taskResult] = await db.query(
      'INSERT INTO tasks (task_name, task_details, task_date, is_done) VALUES (?, ?, ?, ?)',
      [task_name, task_details, task_date, is_done]
    );

    const taskId = taskResult.insertId;

    // Step 2: Insert into task_users table
    const [taskUserResult] = await db.query(
      'INSERT INTO task_users (user_id, task_id, received_approv) VALUES (?, ?, ?)',
      [user_id, taskId, received_approv]
    );

    // Commit the transaction if both steps are successful
    await db.commit();

    const insertedTaskId = taskResult.insertId;
    const insertedTaskUserId = taskUserResult.insertId;

    res.status(201).json({
      task: { id: insertedTaskId, task_name, task_details, task_date, is_done },
      task_user: { id: insertedTaskUserId, user_id, task_id: taskId, received_approv },
    });
  } catch (err) {
    // If an error occurs, roll back the transaction
    await db.rollback();

    console.error('Error executing MySQL query: ', err);
    res.status(500).send('Internal Server Error');
  }
};

exports.updateTask = async (req, res) => {
  const taskId = req.params.id;
  const { task_name, task_details, task_date, is_done } = req.body;

  try {
    const [result] = await db.query(
      'UPDATE tasks SET task_name = ?, task_details = ?, task_date = ?, is_done = ? WHERE id_task = ?',
      [task_name, task_details, task_date, is_done, taskId]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Task not found' });
    } else {
      res.json({ id: taskId, task_name, task_details, task_date, is_done });
    }
  } catch (err) {
    console.error('Error executing MySQL query: ', err);
    res.status(500).send('Internal Server Error');
  }
};
