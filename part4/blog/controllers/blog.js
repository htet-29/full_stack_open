const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const body = request.body
  const user = await User.findById(body.userId)
  
  if (!user) {
    return response.status(400).json(({ error: 'userId missing or not valid' }))
  }

  if (!body.title || !body.url) {
    response.status(400).json({ error: 'Missing required field (title or url)'})
  }
  
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save() 
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const { likes } = request.body
  const blog = await Blog.findById(request.params.id)
  blog.likes = likes
  const updatedBlog = await blog.save();
  response.json(updatedBlog)
})

module.exports = blogRouter