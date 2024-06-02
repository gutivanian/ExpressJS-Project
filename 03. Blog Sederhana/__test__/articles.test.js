const request = require('supertest');
const express = require('express')
const bodyParser = require('body-parser')
const articlesRouter = require('../routes/articles')

const app = express();
app.use(bodyParser.json());
app.use('/articles',articlesRouter)

describe('Testing Articles API', () =>{
    it('should return all articles', async()=>{
        const res = await request(app)
            .get('/articles')
            .send();
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array)
    });

    it('shoul get article by id', async()=>{
        const articleId = 1;
        const res = await request(app)
            .get(`/articles/${articleId}`)
            .send();
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).toEqual(1);
    })

    it('should create a new article', async()=>{
      const newArticle = {
        title: 'Artikel Baru',
        content: 'Ini adalah artikel baru',
        category_id: 1
      }  

      const res = await request(app)
        .post('/articles')
        .send(newArticle);

      expect(res.statusCode).toEqual(201);
      expect(res.body.title).toEqual('Artikel Baru');
      expect(res.body).toHaveProperty('id')
    })

    it('should update an article', async()=>{
      const articleId = 1;
      const updatedArticle = {
        title: 'Artikel Baru',
        content: 'Ini adalah artikel baru',
        category_id: 1
      }  

      const res = await request(app)
        .put(`/articles/${articleId}`)
        .send(updatedArticle);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body.title).toEqual(updatedArticle.title)
    })

    it('should delete an article', async()=>{
        const articleId = 1;
        const res = await request(app)
            .delete(`/articles/${articleId}`)
            .send();
        
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Article deleted successfully')
    })
})