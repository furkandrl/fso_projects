const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')

const api = supertest(app)
const Blog=require('../models/blog')
const User = require('../models/user')

const helper = require('./test_helper')


beforeEach(async () => {  
    await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)

})  

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})
test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(2)
})
  
test('the first blog is about HTTP methods', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body[0].title).toBe('React patterns')
})
test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})
  
test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
  
    const titles = response.body.map(r => r.title)  
    expect(titles).toContain(    
        'Go To Statement Considered Harmful'  
        )
    })

describe('addition of a new blog', () => {    
test('success with valid data', async () => {
    const newBlog = {
     title: "async/await simplifies making async calls",
     author: "Furkan Dereli",
     url: "test.test",
     likes: 31
    }
      
     await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      
        const response = await helper.blogsInDb()
        expect(response).toHaveLength(helper.initialBlogs.length+1)
        
        const titles = response.map(r => r.title)
        expect(titles).toContain(
          "async/await simplifies making async calls"
        )
})


test('fails with status code 400 if data is invalid', async () => {
    const newBlog = {
    author:"yok"
    }
          
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
          
    const blogsAtEnd = await helper.blogsInDb()
          
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
})  

describe('viewing a specific blog', () => {
    test('succeeds with a valid id', async () => {
        const blogsAtStart = await helper.blogsInDb()
      
        const blogToView = blogsAtStart[0]
      
        const resultBlog = await api    
        .get(`/api/blogs/${blogToView.id}`)    
        .expect(200)    
        .expect('Content-Type', /application\/json/)
        const processedBlogToView = JSON.parse(JSON.stringify(blogToView))
      
        expect(resultBlog.body).toEqual(processedBlogToView)
})

   test('fails with status code 404 if blog does not exist', async() => {
    const validNonExistingId= await helper.nonExistingId()

    console.log(validNonExistingId)

    await api
      .get(`/api/blogs/${validNonExistingId}`)
      .expect(404)
   })

   test('fails with statuscode 400 id is invalid', async() => {
    const invalidId= '5a3d5da59070081a82a3445'

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
   })
}) 

describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]
      
        await api    
        .delete(`/api/blogs/${blogToDelete.id}`)    
        .expect(204)
        const blogsAtEnd = await helper.blogsInDb()
      
        expect(blogsAtEnd).toHaveLength(
        helper.initialBlogs.length - 1
        )
      
        const titles = blogsAtEnd.map(r => r.title)
      
        expect(titles).not.toContain(blogToDelete.title)
})    
})

describe('updating a blog', () =>{
    test('like number of a blog updated ', async () =>{
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]
       
        
        const blog = {
            likes: 31
          }

       await api
        .put(`/api/blogs/${blogToUpdate.id}`) 
        .send(blog)   
        .expect(200)
        
        const blogsAtEnd = await helper.blogsInDb()
        const likes = blogsAtEnd.map(b => b.likes)
        expect(likes).toContain(31)
    })
})

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
      await User.deleteMany({})
  
      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root', passwordHash })
  
      await user.save()
    })
  
    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen',
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  
      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()
    
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
    
        expect(result.body.error).toContain('password must be at least 8 characters long,  contain at least one special character and uppercase letter.')
    
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
      })
      
  })


afterAll(() => {
  mongoose.connection.close()
}, 100000)