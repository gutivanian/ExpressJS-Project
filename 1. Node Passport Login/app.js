const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

// connect mongo
const db = require('./config/keys').MongoURI;
mongoose.connect(db, {useNewUrlParser: true})
.then(console.log("MongoDB connected"))
.catch(err =>console.log(err))



// routes
const index = require('./routes/index');
const users = require('./routes/users');

const app = express();
const port = process.env.PORT || 5000

// bodyparser
app.use(express.urlencoded({extended:false}))

// EJS middleware
app.use(expressLayouts)
app.set('view engine', 'ejs')

// routes middleware
app.use('/', index)
app.use("/users", users)

app.listen(port, console.log(`Server started on port ${port}`));