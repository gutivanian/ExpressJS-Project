var models = require('../db/models.js')
var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')

// get all article_tag
router.get('/', async (req, res) => {
    try{
        const result = await models.query('SELECT * FROM article_tag', [])
        res.status(200).json(result.rows)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

// get article_tag by id
router.get('/:id', async (req, res) => {
    try{
        const id = req.params.id
        const result = await models.query('SELECT * FROM article_tag WHERE id = $1', [id])
        res.status(200).json(result.rows)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

// add new article tag
router.post('/', async (req, res) => {
    try{
        const {article_id, tag_id} = req.body
        const result = await models.query('INSERT INTO article_tag (article_id, tag_id) VALUES ($1, $2) RETURNING *', [article_id, tag_id])
        res.status(201).json(result.rows)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

// edit article tag
router.put('/:id', async (req, res) => {
    try{
        const id = req.params.id
        const {article_id, tag_id} = req.body
        const result = await models.query('UPDATE article_tag SET article_id = $1, tag_id = $2 WHERE id = $3 RETURNING *', [article_id, tag_id, id])
        res.status(200).json(result.rows)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

// delete article tag
router.delete('/:id', async (req, res) {
    try{
        const id = req.params.id
        const result = await models.query('DELETE FROM article_tag WHERE id = $1 RETURNING *', [id])
        res.status(200).json(result.rows)
        if (result.rowCount > 0) {
            res.status(200).json({ message: 'Article tag deleted successfully' });
        } else {
            res.status(404).json({ message: 'Article tag not found' });
        }
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

module.exports = router