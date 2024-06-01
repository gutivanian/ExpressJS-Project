var models = require('../db/models.js')
var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')
router.use(bodyParser.json());
// get all articcle
router.get('/', async (req,res) =>{
    try{
        const result = await models.query('SELECT * FROM articles ',[])
        res.status(200).json(result.rows)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

// get article by id
router.get('/:id', async (req,res)=>{
    try{
        const id = req.params.id;
        const result = await models.query('SELECT * FROM articles WHERE id = $1',[id]);
        res.status(200).json(result.rows)
    }catch(err){
        res.status(500).json({message: err.message})
    }
}
)

// post a new article
router.post('/', async (req,res)=>{
    try{
        const {title, content, category_id} = req.body;
        const result = await models.query('INSERT INTO articles (title, content, category_id) VALUES ($1,$2,$3) RETURNING *', [title, content, category_id]);
        res.status(201).json(result.rows[0])  
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

// edit an article
router.put('/:id', async (req,res)=>{
    try{
        const id = req.params.id;
        const {title, content, category_id} = req.body;
        const result = await models.query('UPDATE articles SET title = $1, content = $2, category_id = $3 WHERE id = $4 RETURNING *', [title, content, category_id, id]);
        res.status(200).json(result.rows[0])
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

// delete an article
router.delete('/:id', async (req,res)=>{
    try{
        const id = req.params.id;
        const result = await models.query('DELETE FROM articles WHERE id = $1 RETURNING *', [id]);
        if (result.rowCount > 0) {
            res.status(200).json({ message: 'Article deleted successfully' });
        } else {
            res.status(404).json({ message: 'Article not found' });
        }
        res.status(200).json(result.rows)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

module.exports = router