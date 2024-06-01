var models = require('../db/models.js')
var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')
router.use(bodyParser.json());

// get all categories
router.get('/', async (req,res)=>{
    try{
        const result = await models.query('SELECT * FROM categories', []);
        res.status(200).json(result.rows);
    }catch(err){
        res.status(500).json({message : err.message});
    }
})

// get categories by id
router.get('/:id', async (req,res)=>{
    try{
        const id = req.params.id;
        const result = await models.query('SELECT * FROM categories WHERE id = $1', [id]);
        res.status(200).json(result.rows);
    }catch(err){
        res.status(500).json({message : err.message});
    }
})

// add new categories
router.post('/', async (req,res)=>{
    try{
        const {name} = req.body;
        const result = await models.query('INSERT INTO categories (name) VALUES ($1) RETURNING *', [name]);
        res.status(200).json(result.rows);

    }catch(err){
        res.status(500).json({message : err.message});
    }
})

// edit category
router.put('/:id', async (req,res)=>{
    try{
        const id = req.params.id;
        const {name} = req.body;
        const result = await models.query('UPDATE categories SET name = $1 WHERE id = $2 RETURNING *', [name, id]);
        res.status(200).json(result.rows);
    }catch(err){
        res.status(500).json({message : err.message});
    }
})

// delete category
router.delete('/:id', async (req,res)=>{
    try{
        const id = req.params.id;
        const result = await models.query('DELETE FROM categories WHERE id = $1 RETURNING *', [id]);
        if (result.rowCount >0){
            res.status(200).json({message : 'Category deleted successfully'});
        }else{
            res.status(404).json({message : 'Category not found'});
        }
        res.status(200).json(result.rows);
    }catch(err){
        res.status(500).json({message : err.message});
    }
})