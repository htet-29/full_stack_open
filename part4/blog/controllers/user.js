const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')
const { asyncHandler } = require('../utils/wrapper')

userRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1})
    response.json(users)
})

userRouter.post('/', asyncHandler(async (request, response, next) => {
    const { username, name, password } = request.body
    
    if (!password) {
        const error = new Error('User validation failed: password: Path `password` is required.')
        error.name = 'ValidationError'
        error.status = 400
        return next(error)
    }
    
    if (password.length < 3) {
        const error = new Error('User validation failed: password: Path `password` (`ts`, length 2) is shorter than the minimum allowed length (3)')
        error.name = 'ValidationError'
        error.status = 400
        return next(error)
    }

    const saltRound = 10
    const passwordHash = await bcrypt.hash(password, saltRound)
    
    const user = new User({
        name,
        username,
        passwordHash
    })
    
    const savedUser = await user.save()
    response.status(201).json(savedUser)
}))

module.exports = userRouter