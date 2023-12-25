// /server/controllers/taskUsersController.js

const db = require('../models/db');

exports.getAllTaskUsers = async (req, res) => {
  try {
    const [rows, fields] = await db.query('SELECT * FROM task_users');
    res.json(rows);
  } catch (err) {
    console.error('Error executing MySQL query: ', err);
    res.status(500).send('Internal Server Error');
  }
};


exports.getTaskUsersByUserId = async (req, res) => {
  const userId = req.params.id;

  try {
    const [rows, fields] = await db.query('SELECT * FROM task_users WHERE user_id = ?', [userId]);

    res.json(rows);
  } catch (err) {
    console.error('Error executing MySQL query: ', err);
    res.status(500).send('Internal Server Error');
  }
};

exports.getUsersByTaskId = async (req, res) => {
  const taskId = req.params.id;

  try {
    const [rows, fields] = await db.query('SELECT * FROM task_users WHERE task_id = ?', [taskId]);

    res.json(rows);
  } catch (err) {
    console.error('Error executing MySQL query: ', err);
    res.status(500).send('Internal Server Error');
  }
};

exports.updateTaskUser = async (req, res) => {
  const taskId = req.params.taskId;
  const userId = req.params.userId;
  const { received_approv } = req.body;
  console.log(received_approv)

  try {
    const [result] = await db.query('UPDATE `task_users` SET `received_approv` = ? WHERE (`task_id` = ?) and (`user_id` = ?)',[received_approv, taskId, userId]);
    ;

    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Task User record not found' });
    } else {
      res.json({ id: userId, received_approv });
    }
  } catch (err) {
    console.error('Error executing MySQL query: ', err);
    res.status(500).send('Internal Server Error');
  }
};

