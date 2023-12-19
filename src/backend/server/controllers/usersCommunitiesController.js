// /server/controllers/usersCommunitiesController.js

const db = require('../models/db');

exports.getAllUsersCommunities = async (req, res) => {
  try {
    const [rows, fields] = await db.query('SELECT * FROM users_communities');
    res.json(rows);
  } catch (err) {
    console.error('Error executing MySQL query: ', err);
    res.status(500).send('Internal Server Error');
  }
};
exports.getUserCommunities = async (req, res) => {
  const userId = req.params.id;

  try {
    const [rows, fields] = await db.query(
      'SELECT communities.* FROM communities JOIN users_communities ON communities.id_community = users_communities.id_community WHERE users_communities.id_user = ?',
      [userId]
    );

    res.json(rows);
  } catch (err) {
    console.error('Error executing MySQL query: ', err);
    res.status(500).send('Internal Server Error');
  }
};

exports.getUserManagerCommunities = async (req, res) => {
  const userId = req.params.id;

  try {
    const [rows, fields] = await db.query(
      'SELECT communities.* FROM communities JOIN users_communities ON communities.id_community = users_communities.id_community WHERE users_communities.id_user = ? AND users_communities.is_manager = 1',
      [userId]
    );

    res.json(rows);
  } catch (err) {
    console.error('Error executing MySQL query: ', err);
    res.status(500).send('Internal Server Error');
  }
};

exports.getUserParticipantCommunities = async (req, res) => {
  const userId = req.params.id;

  try {
    const [rows, fields] = await db.query(
      'SELECT communities.* FROM communities JOIN users_communities ON communities.id_community = users_communities.id_community WHERE users_communities.id_user = ? AND users_communities.is_manager = 0',
      [userId]
    );

    res.json(rows);
  } catch (err) {
    console.error('Error executing MySQL query: ', err);
    res.status(500).send('Internal Server Error');
  }
};

exports.updateUserCommunity = async (req, res) => {
  const recordId = req.params.id;
  const { is_manager } = req.body;

  try {
    const [result] = await db.query('UPDATE users_communities SET is_manager = ? WHERE id = ?', [is_manager, recordId]);

    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'User Community record not found' });
    } else {
      res.json({ id: recordId, is_manager });
    }
  } catch (err) {
    console.error('Error executing MySQL query: ', err);
    res.status(500).send('Internal Server Error');
  }
};
