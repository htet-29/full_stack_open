const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const User = require('../models/user')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)

describe('when there is initially one user in db', () => { 
    beforeEach(async () => {
        await User.deleteMany({})
        
        const passwordHash = await bcrypt.hash('root@12345', 10)
        const user = new User({ username: 'root', passwordHash})
        
        await user.save()
    })
    
    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDB()
        
        const newUser = {
            username: 'test',
            name: 'tester',
            password: 'test@12345'
        }
        
        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        const usersAtEnd = await helper.usersInDB()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
        
        const usernames = usersAtEnd.map(u => u.username)
        assert(usernames.includes(newUser.username))
    })

    test('POST request without username return 400 Bad Request with proper error message', async () => {
        const usersAtStart = await helper.usersInDB()
        
        const newUser = {
            name: 'tester',
            password: 'test@12345'
        }
        
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        
        const usersAtEnd = await helper.usersInDB()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
        
        assert(result.body.error.includes('Path `username` is required'))
    })
    
    test('POST request with invalid username return 400 Bad Request with proper error message', async () => {
        const usersAtStart = await helper.usersInDB()
        
        const newUser = {
            username: 'ts',
            name: 'tester',
            password: 'test@12345'
        }
        
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        
        const usersAtEnd = await helper.usersInDB()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
        
        assert(result.body.error.includes('Path `username` (`ts`, length 2) is shorter than the minimum allowed length (3)'))
    })

    test('POST request without password return 400 Bad Request with proper error message', async () => {
        const usersAtStart = await helper.usersInDB()
        
        const newUser = {
            username: 'test',
            name: 'tester'
        }
        
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        
        const usersAtEnd = await helper.usersInDB()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
        
        assert(result.body.error.includes('Path `password` is required'))
    })
    
    test('POST request with invalid password return 400 Bad Request with proper error message', async () => {
        const usersAtStart = await helper.usersInDB()
        
        const newUser = {
            username: 'ts',
            name: 'tester',
            password: 'te'
        }
        
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        
        const usersAtEnd = await helper.usersInDB()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
        
        assert(result.body.error.includes('Path `password` (`ts`, length 2) is shorter than the minimum allowed length (3)'))
    })
    
    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDB()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen',
        }
        
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        
        const usersAtEnd = await helper.usersInDB()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
        
        assert(result.body.error.includes('expected `username` to be unique'))
        
    })
})

after(async () => {
    await mongoose.connection.close()
})