// /server/controllers/communitiesController.js

const db = require('../models/db');

exports.getAllCommunities = async (req, res) => {
  try {
    const [rows, fields] = await db.query('SELECT * FROM communities');
    res.json(rows);
  } catch (err) {
    console.error('Error executing MySQL query: ', err);
    res.status(500).send('Internal Server Error');
  }
};
exports.getCommunityById = async (req, res) => {
  const communityId = req.params.id;

  try {
    const [rows, fields] = await db.query('SELECT * FROM communities WHERE id_community = ?', [communityId]);

    if (rows.length === 0) {
      res.status(404).json({ message: 'Community not found' });
    } else {
      res.json(rows[0]);
    }
  } catch (err) {
    console.error('Error executing MySQL query: ', err);
    res.status(500).send('Internal Server Error');
  }
};

exports.createCommunity = async (req, res) => {
  const { community_name, community_details, user_id, is_manager } = req.body;

  try {
    // Begin a transaction
    await db.beginTransaction();

    // Step 1: Insert into communities table
    const [communityResult] = await db.query('INSERT INTO communities (community_name, community_details) VALUES (?, ?)', [
      community_name,
      community_details,
    ]);

    const communityId = communityResult.insertId;

    // Step 2: Insert into users_communities table
    const [userCommunityResult] = await db.query(
      'INSERT INTO users_communities (id_user, id_community, is_manager) VALUES (?, ?, ?)',
      [user_id, communityId, is_manager]
    );

    // Commit the transaction if both steps are successful
    await db.commit();

    const insertedCommunityId = communityResult.insertId;
    const insertedUserCommunityId = userCommunityResult.insertId;

    res.status(201).json({
      community: { id: insertedCommunityId, community_name, community_details },
      user_community: { id: insertedUserCommunityId, id_user: user_id, id_community: communityId, is_manager },
    });
  } catch (err) {
    // If an error occurs, roll back the transaction
    await db.rollback();

    console.error('Error executing MySQL query: ', err);
    res.status(500).send('Internal Server Error');
  }
};

exports.updateCommunity = async (req, res) => {
  const communityId = req.params.id;
  const { community_name, community_details } = req.body;

  try {
    const [result] = await db.query(
      'UPDATE communities SET community_name = ?, community_details = ? WHERE id_community = ?',
      [community_name, community_details, communityId]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Community not found' });
    } else {
      res.json({ id: communityId, community_name, community_details });
    }
  } catch (err) {
    console.error('Error executing MySQL query: ', err);
    res.status(500).send('Internal Server Error');
  }
};