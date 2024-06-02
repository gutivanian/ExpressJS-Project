const {Pool} = require('pg');
require('dotenv').config()

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "restoran_db",
    password: "123456",
    port: 5432
});

module.exports = pool;