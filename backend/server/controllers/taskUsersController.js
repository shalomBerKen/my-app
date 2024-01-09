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

exports.addTaskUser = async (req, res) => {
  const userId = req.params.userId;
  const taskId = req.params.taskId;

  try {
    const [result] = await db.query('INSERT INTO `task_users` (`user_id`, `task_id`, `received_approv`) VALUES (?, ?, 0)', [userId, taskId]);

    res.json({ id: result.insertId, received_approv: 0 });
  } catch (err) {
    console.error('Error executing MySQL query: ', err);
    res.status(500).send('Internal Server Error');
  }
};


exports.deleteTaskUser = async (req, res) => {
  const userId = req.params.userId;
  const taskId = req.params.taskId;

  try {
    const [result] = await db.query('DELETE FROM `task_users` WHERE `user_id` = ? AND `task_id` = ?', [userId, taskId]);
    // console.log('DELETE FROM `task_users` WHERE `user_id` = ? AND `task_id` = ?', [userId, taskId]);
    if (result.affectedRows > 0) {
      res.json({ message: 'Task-user relationship deleted successfully' });
    } else {
      // console.log("delete");
      res.status(404).json({ message: 'Task-user relationship not found' });
    }
  } catch (err) {
    console.error('Error executing MySQL query: ', err);
    res.status(500).send('Internal Server Error');
  }
};

