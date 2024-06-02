const request = require('supertest');
const express = require('express')
const bodyParser = require('body-parser')
const pelangganRouter = require('../routes/pelanggan')

const app = express();
app.use(bodyParser.json());
app.use('/api/pelanggan',pelangganRouter)

describe('API Pelanggan', () => {
    let pelangganId;

    it('should create a new pelanggan', async () => {
        const res = await request(app)
            .post('/api/pelanggan')
            .send({
                nama: 'John Doe',
                kontak: '123456789'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body[0]).toHaveProperty('id');
        pelangganId = res.body[0].id;
        console.log(pelangganId);
    });

    it('should fetch all pelanggan', async () => {
        const res = await request(app).get('/api/pelanggan');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    it('should fetch a pelanggan by ID', async () => {
        const res = await request(app).get(`/api/pelanggan/${pelangganId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body[0]).toHaveProperty('id', pelangganId);
    });

    it('should update a pelanggan', async () => {
        const res = await request(app)
            .put(`/api/pelanggan/${pelangganId}`)
            .send({
                nama: 'Jane Doe',
                kontak: '987654321'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body[0]).toHaveProperty('nama', 'Jane Doe');
    });

    it('should delete a pelanggan', async () => {
        const res = await request(app).delete(`/api/pelanggan/${pelangganId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual( 'Pelanggan berhasil dihapus');
    });
});
