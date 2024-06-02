// checkConnection.js

const pool = require('./koneksi'); // Mengimpor pool koneksi dari file Anda

// Mengecek koneksi
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Connected to the database');

  // Menjalankan kueri sederhana untuk memastikan koneksi berfungsi
  client.query('SELECT NOW()', (err, result) => {
    release(); // Melepas koneksi dari pool

    if (err) {
      return console.error('Error executing query', err.stack);
    }
    console.log('Query executed successfully. Current time in the database:', result.rows[0].now);

    // Lakukan tindakan lain yang sesuai dengan hasil pengecekan koneksi
  });
});
