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
  const communityId = req.params.communityId; // Assuming you have communityId in the request params
  const taskId = req.params.taskId; // Assuming you have taskId in the request params

  try {
    const [rows, fields] = await db.query(
      'SELECT tasks.*, users.user_id, users.user_name, task_users.received_approv FROM tasks ' +
      'JOIN communities ON tasks.community_id = communities.community_id ' +
      'LEFT JOIN task_users ON tasks.task_id = task_users.task_id ' +
      'LEFT JOIN users ON task_users.user_id = users.user_id ' +
      'WHERE tasks.task_id = ?',
      [taskId, communityId]
    );

    if (rows.length === 0) {
      res.status(404).json({ message: 'Task not found' });
    } else {
      // Assuming you want to return an array of results even if there is only one row
      res.json(rows);
    }
  } catch (err) {
    console.error('Error executing MySQL query: ', err);
    res.status(500).send('Internal Server Error');
  }
};

exports.getTaskByIdForAdmin = async (req, res) => {
  const userId = req.params.userId;
  const communityId = req.params.communityId; // Assuming you have communityId in the request params
  const taskId = req.params.taskId; // Assuming you have taskId in the request params

  try {
    const [managerResult] = await db.query('SELECT is_manager FROM users_communities WHERE user_id = ? AND community_id = ?', [userId, communityId]);
    if (managerResult.length > 0 && managerResult[0].is_manager === 1) {

      const [rows, fields] = await db.query(
        'SELECT tasks.*, users.user_id, users.user_name, task_users.received_approv FROM tasks ' +
        'JOIN communities ON tasks.community_id = communities.community_id ' +
        'LEFT JOIN task_users ON tasks.task_id = task_users.task_id ' +
        'LEFT JOIN users ON task_users.user_id = users.user_id ' +
        'WHERE tasks.task_id = ?',
        [taskId]
      );

      if (rows.length === 0) {
        res.status(404).json({ message: 'Task not found' });
      } else {
        // Assuming you want to return an array of results even if there is only one row
        res.json(rows);
      }
    }else {
      res.status(403).send('User is not an administrator of this community');
    }
  } catch (err) {
    console.error('Error executing MySQL query: ', err);
    res.status(500).send('Internal Server Error');
  }
};

exports.getTaskByIdForParticipant = async (req, res) => {
  const userId = req.params.userId;
  const communityId = req.params.communityId; // Assuming you have communityId in the request params
  const taskId = req.params.taskId; // Assuming you have taskId in the request params

  try {
    const [managerResult] = await db.query('SELECT is_manager FROM users_communities WHERE user_id = ? AND community_id = ?', [userId, communityId]);
    if (managerResult.length > 0 && managerResult[0].is_manager === 0) {

      const [rows, fields] = await db.query(
        'SELECT tasks.*, users.user_id, users.user_name, task_users.received_approv FROM tasks ' +
        'JOIN communities ON tasks.community_id = communities.community_id ' +
        'LEFT JOIN task_users ON tasks.task_id = task_users.task_id ' +
        'LEFT JOIN users ON task_users.user_id = users.user_id ' +
        'WHERE tasks.task_id = ?',
        [taskId]
      );
    
      if (rows.length === 0) {
        res.status(404).json({ message: 'Task not found' });
      } else {
        // Assuming you want to return an array of results even if there is only one row
        res.json(rows);
      }
    }else {
      res.status(403).send('User is not participant in this community');
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
  const { community_id, task_name, task_details, task_date, is_done } = req.body;

  let connection;

  try {
    // Get a connection from the pool
    connection = await db.getConnection();

    // Begin a transaction
    await connection.beginTransaction();

    const [taskResult] = await connection.query(
      'INSERT INTO tasks (community_id, task_name, task_details, task_date, is_done) VALUES (?, ?, ?, ?, ?)',
      [community_id, task_name, task_details, task_date, is_done]
    );

    // Commit the transaction if both steps are successful
    await connection.commit();

    const insertedTaskId = taskResult.insertId;

    res.status(201).json({
      task: { id: insertedTaskId, task_name, task_details, task_date, is_done },
    });
  } catch (err) {
    // If an error occurs, roll back the transaction
    console.error('Error executing MySQL query: ', err);
    if (connection) {
      await connection.rollback();
    }
    res.status(500).send('Internal Server Error');
  } finally {
    // Release the connection back to the pool
    if (connection) {
      connection.release();
    }
  }
};


exports.updateTask = async (req, res) => {
  const taskId = req.params.id;
  const { task_name, task_details, task_date, is_done } = req.body;

  try {
    const [result] = await db.query(
      'UPDATE tasks SET task_name = ?, task_details = ?, is_done = ? WHERE task_id = ?',
      [task_name, task_details, is_done, taskId]
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
