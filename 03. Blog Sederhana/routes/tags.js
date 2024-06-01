const models = require('../db/models.js');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json());

// show all tags
router.get('/', async (req, res) => {
    try{
        const result = await models.query('SELECT * FROM tags;', []);
        res.status(200).json(result.rows);
    }catch(err){
        res.status(404).json({message: err.message});
    }
})

// show tags by id
router.get('/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const result = await models.query('SELECT * FROM tags WHERE id = $1;', [id]);
        res.status(200).json(result.rows);
    }catch(err){
        res.status(404).json({message: err.message});
    }
})

// create new tag
router.post('/', async (req, res) => {
    try{
        const {name} = req.body;
        const result = await models.query('INSERT INTO tags (name) VALUES ($1) RETURNING *;', [name]);
        res.status(201).json(result.rows[0]);
    }catch(err){
        res.status(500).json({message: err.message});
    }
})

// update tag by id
router.put('/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const {name} = req.body;
        const result = await models.query('UPDATE tags SET name = $1 WHERE id = $2 RETURNING *;', [name, id]);
        res.status(200).json(result.rows);
    }catch(err){
        res.status(500).json({message: err.message});
    }
})

// delete a tag
router.delete('/:id', async (req, res) =>{
    try{
        const id = req.params.id;
        const result = await models.query('DELETE FROM tags WHERE id = $1 RETURNING *;', [id]);
        if(result.rowCount > 0){
            res.status(200).json({message: 'Tag deleted'})
        } else {
            res.status(404).json({message: 'Tag not found'})
        }
    }catch(err){
        res.status(500).json({message: err.message});
    }
})

module.exports = router