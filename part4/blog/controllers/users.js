const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  
  var passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")

  if(username.length<3 || name.length<3){
    return response.status(400).json({      
      error: 'username and name must be at least 3 characters long.'    
    })  
  }

  if (passwordRegex.test(password) === false) {
    return response.status(400).json({ error: 'password must be at least 8 characters long, contain at least one special character and uppercase letter.' })
  }

  const existingUser = await User.findOne({ username })  
  if (existingUser) {    
    return response.status(400).json({      
    error: 'username must be unique'    
  })  
}

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User
  .find({}).populate('blogs',{title: 1, author: 1, likes: 1, id: 1} )

  response.json(users)
})

module.exports = usersRouter