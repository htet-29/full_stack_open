const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogRouter = require('./controllers/blog')
const userRouter = require('./controllers/user')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

const app = express()

logger.info('connecting to', config.MONGODB_URI)

mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
        console.log('connect to MongoDB')
    })
    .catch(error => {
        console.error('error connecting to MongoDB:', error.message)
    })

app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app