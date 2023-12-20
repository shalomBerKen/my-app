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
