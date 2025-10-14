const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }
    
    return blogs.length === 0
        ? 0
        : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const findMax = (max, current) => {
        return current.likes > max.likes ? current : max
    }

    return blogs.length === 0
        ? 0
        : blogs.reduce(findMax, blogs[0])
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return 0

    return lodash.chain(blogs)
        .groupBy('author') 
        .map((value, key) => ({
            author: key,
            blogs: value.length
        }))
        .maxBy('blogs')
        .value()
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}