// /server/controllers/communitiesTasksController.js

const db = require('../models/db');


exports.getTasksForCommunityAdmin = async (req, res) => {
  const userId = req.params.userId;
  const communityId = req.params.communityId;

  try {
    const [managerResult] = await db.query('SELECT is_manager FROM users_communities WHERE user_id = ? AND community_id = ?', [userId, communityId]);

    if (managerResult.length > 0 && managerResult[0].is_manager === 1) {
      const [tasksResult] = await db.query(`
        SELECT tasks.*, GROUP_CONCAT(users.user_name) AS related_users, GROUP_CONCAT(task_users.received_approv) AS received_approv
        FROM tasks
        JOIN task_users ON tasks.task_id = task_users.task_id
        JOIN users ON task_users.user_id = users.user_id
        WHERE tasks.community_id = ?
        GROUP BY tasks.task_id
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
    const [participantResult] = await db.query('SELECT is_manager FROM users_communities WHERE user_id = ? AND community_id = ?', [userId, communityId]);

    if (participantResult.length > 0 && participantResult[0].is_manager === 0) {
      const tasksQuery = `
        SELECT 
          tasks.*,
          task_users.received_approv IS NOT NULL AS has_approval,
          CASE WHEN task_users.received_approv IS NOT NULL THEN 1 ELSE 0 END AS has_connection
        FROM tasks
        LEFT JOIN task_users ON tasks.task_id = task_users.task_id AND task_users.user_id = ?
        WHERE tasks.community_id = ?
      `;
      const [tasksResult] = await db.query(tasksQuery, [userId, communityId]);

      res.json(tasksResult);
    } else {
      res.status(403).send('User is not a participant in this community');
    }
  } catch (err) {
    console.error('Error executing MySQL query: ', err);
    res.status(500).send('Internal Server Error');
  }
};
