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
      'SELECT communities.* FROM communities JOIN users_communities ON communities.community_id = users_communities.community_id WHERE users_communities.user_id = ?',
      [userId]
    );

    res.json(rows);
  } catch (err) {
    console.error('Error executing MySQL query: ', err);
    res.status(500).send('Internal Server Error');
  }
};

exports.isUserCommunityAdmin = async (userId, communityId) => {
  try {
    const [rows, fields] = await db.query(
      'SELECT * FROM users_communities WHERE user_id = ? AND community_id = ? AND is_manager = 1',
      [userId, communityId]
    );

    return rows.length > 0;
  } catch (err) {
    console.error('Error executing MySQL query: ', err);
    throw err; // Handle the error appropriately in your route/controller
  }
};

exports.getUserManagerCommunities = async (req, res) => {
  const userId = req.params.id;

  try {
    const [rows, fields] = await db.query(
      'SELECT communities.* FROM communities JOIN users_communities ON communities.community_id = users_communities.community_id WHERE users_communities.user_id = ? AND users_communities.is_manager = 1',
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
      'SELECT communities.* FROM communities JOIN users_communities ON communities.community_id = users_communities.community_id WHERE users_communities.user_id = ? AND users_communities.is_manager = 0',
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

exports.createCommunityParticipant = async (req, res) => {
  const { user_id, community_id } = req.body;

  if (!user_id || !community_id) {
    return res.status(400).json({ message: 'user_id and community_id are required' });
  }

  try {
    // Check if the community with the given community_id exists
    const communityExists = await db.query('SELECT * FROM communities WHERE community_id = ?', [community_id]);

    if (communityExists[0].length === 0) {
      return res.status(404).json({ message: 'Community not found' });
    } else {
      // If the community exists, proceed with creating the connection
      const [result] = await db.query('INSERT INTO users_communities (user_id, community_id, is_manager) VALUES (?, ?, 0)', [user_id, community_id]);

      // Check if the insertion was successful
      if (result.affectedRows === 1) {
        res.status(201).json({ message: 'Community participant created successfully' });
      } else {
        res.status(500).json({ message: 'Failed to create community participant' });
      }
    }
  } catch (err) {
    console.error('Error executing MySQL query: ', err);
    res.status(500).send('Internal Server Error');
  }
};
