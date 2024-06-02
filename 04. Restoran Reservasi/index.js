const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const pelangganRoutes = require('./routes/pelanggan');
const reservasiRoutes = require('./routes/reservasi');
const menuRoutes = require('./routes/menu');

app.use(bodyParser.json());

app.use('/api/pelanggan', pelangganRoutes);
app.use('/api/reservasi', reservasiRoutes);
app.use('/api/menu', menuRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
