// /server/controllers/communitiesTasksController.js

const db = require('../models/db');

exports.getAllCommunitiesTasks = async (req, res) => {
  try {
    const [rows, fields] = await db.query('SELECT * FROM communities_tasks');
    res.json(rows);
  } catch (err) {
    console.error('Error executing MySQL query: ', err);
    res.status(500).send('Internal Server Error');
  }
};

exports.getTasksForCommunityAdmin = async (req, res) => {
  const userId = req.params.userId;
  const communityId = req.params.communityId;

  try {
    // Check if the user is a manager/administrator of the community
    const [managerResult] = await db.query('SELECT is_manager FROM users_communities WHERE id_user = ? AND id_community = ?', [userId, communityId]);

    if (managerResult.length > 0 && managerResult[0].is_manager === 1) {
      // If the user is a manager, get all tasks for the community along with related users and received_approv
      const [tasksResult] = await db.query(`
        SELECT tasks.*, GROUP_CONCAT(users.user_name) AS related_users, GROUP_CONCAT(task_users.received_approv) AS received_approv
        FROM tasks
        JOIN communities_tasks ON tasks.id_task = communities_tasks.id_task
        JOIN task_users ON tasks.id_task = task_users.task_id
        JOIN users ON task_users.user_id = users.id_user
        WHERE communities_tasks.id_community = ?
        GROUP BY tasks.id_task
      `, [communityId]);

      res.json(tasksResult);
    } else {
      res.status(403).send('User is not an administrator of this community');
    }
  } catch (err) {
    console.error('Error executing MySQL query: ', err);
    res.status(500).send('Internal Server Error');
  }
};


exports.getTasksForCommunityParticipant = async (req, res) => {
  const userId = req.params.userId;
  const communityId = req.params.communityId;

  try {
    // Check if the user is a participant (not a manager) of the community
    const [participantResult] = await db.query('SELECT is_manager FROM users_communities WHERE id_user = ? AND id_community = ?', [userId, communityId]);

    if (participantResult.length > 0 && participantResult[0].is_manager === 0) {
      // If the user is a participant, get all tasks for the community
      const [tasksResult] = await db.query('SELECT tasks.* FROM tasks JOIN communities_tasks ON tasks.id_task = communities_tasks.id_task WHERE communities_tasks.id_community = ?', [communityId]);
      res.json(tasksResult);
    } else {
      res.status(403).send('User is not a participant in this community');
    }
  } catch (err) {
    console.error('Error executing MySQL query: ', err);
    res.status(500).send('Internal Server Error');
  }
};

exports.addCommunityTask = async (req, res) => {
    const { id_community, id_task } = req.body;
  
    try {
      const [result] = await db.query('INSERT INTO communities_tasks (id_community, id_task) VALUES (?, ?)', [id_community, id_task]);
      res.json({ id: result.insertId });
    } catch (err) {
      console.error('Error executing MySQL query: ', err);
      res.status(500).send('Internal Server Error');
    }
  };
