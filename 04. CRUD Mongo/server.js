const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Item = require('./models/item');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const dbURI = 'mongodb+srv://latihan:r0X84hiaMNLsAIMs@cluster0.1wcjhg1.mongodb.net/'
mongoose.connect(dbURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> console.log('MongoDB connected'))
  .catch(err => console.log(err));


// Rute CRUD

app.post('/item', (req,res)=>{
    const newItem = new Item({
        name: req.body.name,
        desccription: req.body.description,
        price: req.body.price
    });

    newItem.save()
        .then(item -> res.json(item))
        .
})