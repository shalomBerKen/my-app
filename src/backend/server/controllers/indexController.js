// /server/controllers/indexController.js

const db = require('../models/db');

exports.home = async (req, res) => {
  try {
    const [rows, fields] = await db.query('SELECT * FROM your_table');
    res.json(rows);
  } catch (err) {
    console.error('Error executing MySQL query: ', err);
    res.status(500).send('Internal Server Error');
  }
};
