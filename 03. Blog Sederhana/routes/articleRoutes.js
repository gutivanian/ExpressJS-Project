const pool = require('./../db/pool');
const model = require('./../db/model');
const express = require('express');
const router = express.Router();

// create an article
router.post('/articles', async (req,res)=>{
    const {title, content, category_id, tags} = req.body;
    model.query('INSERT INTO articles (title, content, category_id')
})