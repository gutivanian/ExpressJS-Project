const Pool = require('pg').Pool
const express = require('express')
const bodyParser = require('body-parser')



const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'coba',
    password: '123456',
    port: 5432
})

const app = express()

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (req, res) => {
    res.json({info: "selamat datang"})
})

// get user
app.get('/users', async (req, res) => {
    const result = await pool.query("SELECT * FROM users ORDER BY id ASC")
    res.json(result.rows)
});

// post user
app.post('/users', async (req,res)=>{
    const {name, email} = req.body
    const results = await pool.query("INSERT INTO users(name, email) VALUES($1, $2) RETURNING *", [name, email])
    res.status(201).send(`user added with ID: ` + results.insertId)
})

app.listen(3000, ()=>{console.log("server berjalan di port 3000")})

// get user id
app.get('/users/:id', async (req,res) =>{
    const id = req.params.id;
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id])
    res.json(result.rows)
})

// update user
app.put('/users/:id',async (req,res)=>{
    const id = req.params.id;
    const {name, email} = req.body;
    const result = await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [name, email, id])
    res.status(200).send(`user dengan id ${id} updated`)
    res.json(result.rows[id-1])
})

// delete user
app.delete('/users/:id', async (req,res)=>{
  const id = req.params.id;
  const result = await pool.query('DELETE FROM users where id = $1', [id])
  res.status(200).json(`user dengan id ${id} deleted`)
})