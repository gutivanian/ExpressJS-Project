const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Item = require('./models/item');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// MongoDB connection
const dbURI = 'mongodb+srv://latihan:r0X84hiaMNLsAIMs@cluster0.1wcjhg1.mongodb.net/';
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// CRUD Routes

// Create an item
app.post('/items', async (req, res) => {
    try {
        const newItem = new Item({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price
        });
        const item = await newItem.save();
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: 'Unable to add this item' });
    }
});

// Read all items
app.get('/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.status(404).json({ noitemsfound: 'No Items found' });
    }
});

// Read a single item
app.get('/items/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) throw new Error('No Item found');
        res.json(item);
    } catch (err) {
        res.status(404).json({ noitemfound: 'No Item found' });
    }
});

// Update an item
app.put('/items/:id', async (req, res) => {
    try {
        const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!item) throw new Error('No Item found');
        res.json(item);
    } catch (err) {
        res.status(400).json({ error: 'Unable to update the Database' });
    }
});

// Delete an item
app.delete('/items/:id', async (req, res) => {
    try {
        const item = await Item.findByIdAndRemove(req.params.id);
        if (!item) throw new Error('No Item found');
        res.json({ success: true });
    } catch (err) {
        res.status(404).json({ error: 'No such item' });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
