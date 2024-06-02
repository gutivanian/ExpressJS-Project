const express = require('express');
const router = express.Router();
const pool = require('../db/koneksi');

// Dapatkan semua menu
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM menu');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Dapatkan menu berdasarkan ID
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await pool.query('SELECT * FROM menu WHERE id = $1', [id]);
        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'Menu tidak ditemukan' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Buat menu baru
router.post('/', async (req, res) => {
    try {
        const { nama_makanan, harga, ketersediaan } = req.body;
        const result = await pool.query(
            'INSERT INTO menu (nama_makanan, harga, ketersediaan) VALUES ($1, $2, $3) RETURNING *',
            [nama_makanan, harga, ketersediaan]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Perbarui menu
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { nama_makanan, harga, ketersediaan } = req.body;
        const result = await pool.query(
            'UPDATE menu SET nama_makanan = $1, harga = $2, ketersediaan = $3 WHERE id = $4 RETURNING *',
            [nama_makanan, harga, ketersediaan, id]
        );
        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'Menu tidak ditemukan' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Hapus menu
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await pool.query('DELETE FROM menu WHERE id = $1 RETURNING *', [id]);
        if (result.rowCount > 0) {
            res.status(200).json({ message: 'Menu berhasil dihapus' });
        } else {
            res.status(404).json({ message: 'Menu tidak ditemukan' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
