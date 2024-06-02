const express = require('express')
const router = express.Router()
const pool = require('../db/koneksi')

// get all pelanggan name
router.get('/', async (req,res)=>{
    try{
        const result = await pool.query('SELECT * FROM pelanggan');
        res.status(200).json(result.rows)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

// get pelanggan by id
router.get('/:id', async (req,res)=>{
    try{
        const id = req.params.id;
        const result = await pool.query('SELECT * FROM pelanggan WHERE id = $1', [id]);
        res.status(200).json(result.rows)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

// post a new pelanggan
router.post('/', async (req,res)=>{
    const {nama, kontak} = req.body;
    try{
        const pelanggan = await pool.query('INSERT INTO pelanggan (nama, kontak) VALUES ($1, $2) RETURNING *', [nama, kontak]);
        res.status(201).json(pelanggan.rows)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

// update pelanggan
router.put('/:id', async (req,res)=>{
    const id = req.params.id;
    const {nama, kontak} = req.body;
    try{
        const pelanggan = await pool.query('UPDATE pelanggan SET nama = $1, kontak = $2 WHERE id = $3 RETURNING *', [nama, kontak, id]);
        res.status(200).json(pelanggan.rows)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

// delete pelanggan
router.delete('/:id', async (req,res)=>{
    const id = req.params.id;
    try{
        const result = await pool.query('DELETE FROM pelanggan WHERE id = $1 RETURNING *', [id]);
        if(result.rowCount > 0){
            res.status(200).json('Pelanggan berhasil dihapus')
        } else {
            res.status(404).json('Pelanggan tidak ditemukan')
        }
    }catch(err){
        res.status(500).json({message: err.message})
    }
});

module.exports = router;