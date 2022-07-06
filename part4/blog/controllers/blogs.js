const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')



blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  .populate('user', {username: 1, name: 1})

  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response, next) => {
   const blog = await Blog.findById(request.params.id)
    
      if (blog) {
        response.json(blog)
      } else {
        response.status(404).end()
      }
})

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if(authorization && authorization.toLowerCase().startsWith('bearer')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if(!decodedToken.id) {
    return response.status(401).json({error: 'token is missing or invalid'})
  }
  
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: 0,
    user: user._id
  })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response, next) => {
  
	const id = request.params.id;
	const token = getTokenFrom(request);
	try {
		const decodedToken = jwt.verify(token, process.env.SECRET)
		if (!token || !decodedToken.id) {
			return response.status(401).json({ error: 'token missing or invalid' })
		}

		const blog = await Blog.findById(id)
		
		if (decodedToken.id.toString() === blog.user.toString()) {
			await blog.remove();
			response.status(204).end();
		} else {
			return response.status(401).json({ error: 'unauthorized' })
		}
	} catch (exception) {
		next(exception);
	}
      
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  try {
	/*	if (!body.likes || !body.title || !body.author || !body.url) {
			return request.status(400).json({
				error: 'content missing'
			})
		}*/
 const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
      response.json(updatedBlog)
}
    catch(error){
      next(error)
    }
})

module.exports = blogsRouter