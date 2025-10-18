const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogRouter = require('./controllers/blog')
const userRouter = require('./controllers/user')

const app = express()

mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
        console.log('connect to MongoDB')
    })
    .catch(error => {
        console.error('error connecting to MongoDB:', error.message)
    })

app.use(express.json())

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)

module.exports = app