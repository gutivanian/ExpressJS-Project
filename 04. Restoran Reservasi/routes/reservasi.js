const express = require('express');
const router = express.Router();
const pool = require('../db/koneksi');

// get all reservasi
router.get('/', async (req,res)=>{
    try{
        const result = await pool.query('SELECT * FROM reservasi');
        res.status(200).json(result.rows)
    }catch(err){
        res.status(500).json({message: err.message})
    }
});

// get reservasi by id
router .get('/:id', async (req,res)=>{
    try{
        const id = req.params.id;
        const result = await pool.query('SELECT * FROM reservasi WHERE id = $1', [id]);
        res.status(200).json(result.rows)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

// get reservasi by pelanggan_id
router.get('/pelanggan/:id', async (req,res)=>{
    try{
        const pelanggan_id = req.params.id;
        const result = await pool.query('SELECT * FROM reservasi WHERE pelanggan_id = $1', [pelanggan_id]);
        res.status(200).json(result.rows)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

// get reservasi by nomor meja
router.get('/meja/:meja', async(req,res)=>{
    try{
        const meja = req.params.meja;
        const result = await pool.query('SELECT * FROM reservasi WHERE meja = $1', [meja]);
        res.status(200).json(result.rows)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

// post a new reservasi
router.post('/', async (req,res) =>{
    try{
        const {pelanggan_id, meja, tanggal_waktu, status} = req.body;
        const reservasi = await pool.query('INSERT INTO reservasi (pelanggan_id, meja, tanggal_waktu, status) VALUES ($1, $2, $3, $4) RETURNING *', [pelanggan_id, meja, tanggal_waktu, status]);
        res.status(200).json(reservasi.rows)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

// update reservasi
router.put('/:id', async (req,res)=>{
    try{
        const id = req.params.id;
        const {pelanggan_id, meja, tanggal_waktu, status} = req.body;
        const reservasi = await pool.query('UPDATE reservasi SET pelanggan_id = $1, meja = $2, tanggal_waktu = $3 WHERE status = $4 id = $5  RETURNING *', [pelanggan_id, meja, tanggal_waktu, status, id]);
        res.status(200).json(reservasi.rows)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

// delete reservasi
router.delete('/:id', async (req,res)=>{
    try{
        const id = req.params.id;
        const result = await pool.query('DELETE FROM reservasi WHERE id = $1 RETURNING *', [id]);
        if (result.rowCount >0){
            res.status(200).json({message : 'Reservasi deleted successfully'});
        }else{
            res.status(404).json({message : 'Reservasi not found'});
        }
    }catch(err){
        res.status(500).json({message : err.message});
    }
})

module.exports = router;