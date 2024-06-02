var express = require('express');
var pg = require('pg');
var bodyParser = require('body-parser');

const articlesRouter = require('./routes/articles');
const categoriesRouter = require('./routes/categories');
const commentsRouter = require('./routes/comments');
const tagsRouter = require('./routes/tags');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/articles', articlesRouter);
app.use('/categories', categoriesRouter);
app.use('/comments', commentsRouter);
app.use('/tags', tagsRouter);

app.listen(port, () => {
    console.log('Server is running on port ' + port);
})
