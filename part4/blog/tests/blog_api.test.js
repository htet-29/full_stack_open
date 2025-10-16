const { test, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    
    await Blog.insertMany(helper.initialBlogs)
})

test('All blogs are return as same amount with json format', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
    const response = await api.get('/api/blogs')
    
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('Verfiy unique identifier property is named id', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body
    blogs.forEach(blog => {
        assert.ok(blog.id)
        assert.strictEqual(blog._id, undefined)
    })
})

test('A valid blog can be added', async () => {
    const newBlog = {
        title: "React Master",
        author: "Michael Jackson",
        url: "https://reactmaster.com/",
        likes: 100,
    }
    
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDB()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map(b => b.title)
    assert(contents.includes('React Master'))
})

test('POST request without likes property defaults likes to 0', async () => {
    const newBlog = {
        title: "React Master",
        author: "Michael Jackson",
        url: "https://reactmaster.com/"
    }
    
    const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const createdBlog = response.body
    assert.strictEqual(createdBlog.likes, 0)
})

test('POST request without title property returns 400 Bad Request', async () => {
    const invalidBlog = {
        author: "Invalid Test",
        url: "http://testurl.com/notitle",
        likes: 1
        // title is missing
    }

    await api  
        .post('/api/blogs')
        .send(invalidBlog)
        .expect(400)
})

test('POST request without url property returns 400 Bad Request', async () => {
    const invalidBlog = {
        title: "No URL",
        author: "Invalid Test",
        likes: 1
        // url is missing
    }

    await api  
        .post('/api/blogs')
        .send(invalidBlog)
        .expect(400)
})

after(async () => {
    await mongoose.connection.close()
})