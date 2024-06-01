const models = require('../db/models.js');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json());

// Get all comments
router.get('/', async (req, res) => {
  try {
    const result = await models.query('SELECT * FROM comments', []);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get comment by comment ID
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await models.query('SELECT * FROM comments WHERE id = $1', [id]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Comment not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get comments by article ID
router.get('/article/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await models.query('SELECT * FROM comments WHERE article_id = $1', [id]);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a comment
router.post('/', async (req, res) => {
  try {
    const { comment, article_id, name, email } = req.body;
    if (!comment || !article_id || !name || !email) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const result = await models.query('INSERT INTO comments (comment, article_id, name, email, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *', [comment, article_id, name, email]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Edit a comment
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { comment } = req.body;
    if (!comment) {
      return res.status(400).json({ message: 'Comment is required' });
    }
    const result = await models.query('UPDATE comments SET comment = $1, updated_at = NOW() WHERE id = $2 RETURNING *', [comment, id]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Comment not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a comment
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await models.query('DELETE FROM comments WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount > 0) {
      res.status(200).json({ message: 'Comment deleted successfully' });
    } else {
      res.status(404).json({ message: 'Comment not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
