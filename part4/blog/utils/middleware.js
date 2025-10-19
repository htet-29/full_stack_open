const jwt = require('jsonwebtoken')
const logger = require('./logger')
const User = require('../models/user')

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:', request.path)
    logger.info('Body:', request.body)
    logger.info('---')
    next()
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (!authorization) {
        request.token = null
    } else if (authorization.startsWith('Bear ')) {
        request.token = authorization.replace('Bear ', '')
    }
    
    next()
}

const userExtractor = async (request, response, next) => {
    if (request.token === null) {
        return next()
    }
    const decodeToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodeToken || !decodeToken.id) {
        const error = new Error('Token invalid or missing user ID')
        error.status = 401 
        error.name = 'JsonWebTokenError'
        throw error
    }
    
    const user = await User.findById(decodeToken.id)
    
    if (!user) {
        const error = new Error('User not found')
        error.status = 404
        throw error
    } else {
        request.user = user
    }
    
    next()
}


const errorHandler = (error, request, response, next) => {
    logger.error(error.message)
    
    if (error.name  === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    } else if (error.name === 'MongoServerError' &&
        error.message.includes('E11000 duplicate key error')) {
        return response.status(400).json({ error: 'expected `username` to be unique'})
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: error.message })
    }
        
    next(error)
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

module.exports = {
    requestLogger,
    tokenExtractor,
    userExtractor,
    unknownEndpoint,
    errorHandler
}