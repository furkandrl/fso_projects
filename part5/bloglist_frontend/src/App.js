import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Bloglist from './components/Bloglist'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [username, setUsername] = useState('')   
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService
    .getAll()
    .then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {    
    event.preventDefault() 

    try {      
      const user = await loginService.login({        
        username, password,      
      })
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      setUsername('')      
      setPassword('')    
    } catch (error) {      
      setNotificationMessage({
        'text': 'Wrong credentials',
        'type': 'error'
      })      
      setTimeout(() => {        
      setNotificationMessage(null)      
    }, 5000)    
  }
  }

  const handleLogout = () => {
		setUser(null)
		blogService.setToken(null)
		window.localStorage.removeItem('loggedBloglistUser')
	}



	const addBlog = async (event) => {
		event.preventDefault()

		blogFormRef.current.toggleVisibility()

		const blog = {
			title: title,
			user: user,
			author: author,
			url: url,
			likes: 0
		}
		console.log(blog)
		if (!title || !author || !url) {
			setNotificationMessage({
				'text': 'Empty fields',
				'type': 'error'
			})
			setTimeout(() => {
				setNotificationMessage(null)
			}, 5000)
		}
		else {
			try {
				blogService.setToken(user.token)
				const response = await blogService.create(blog)
				setBlogs(blogs.concat(response))
				setTitle('')
				setAuthor('')
				setUrl('')

				setNotificationMessage({
					'text': `${title} by ${author} added`,
					'type': 'notification'
				})
				setTimeout(() => {
					setNotificationMessage(null)
				}, 5000)

			} catch (err) {
				console.log(err)
			}
		}
	}


  const deleteBlog = async (e) => {
    const selectedBlogId = e.target.value
    const selectedBlog = blogs.find(b => b.id === selectedBlogId)

    try {
      if (window.confirm(`Do you really want to delete ${selectedBlog.title}?`) === true){
        blogService.setToken(user.token)
        await blogService.deleteBlog(selectedBlogId)
        setBlogs(blogs.filter(b => b.id !== selectedBlogId))
        setNotificationMessage({
          'text': 'deleted',
          'type': 'notification'
        })
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      }

    }catch (error) {
      setNotificationMessage({
        'text': 'Only the owner of the post can delete it.',
        'type': 'error'
      })
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const handleLike = async (blog) => {
		try {
			const newObject = { ...blog.blog, likes: blog.blog.likes + 1, }
			console.log(newObject)
			blogService.update(blog.blog.id, newObject)
			setBlogs(blogs.map(p => (p.id === blog.blog.id ? newObject : p)))
		} catch (error) {
			setNotificationMessage({
				'text': error.response.data.error,
				'type': 'error'
			})

			setTimeout(() => {
				setNotificationMessage(null)
			}, 5000)
		}
	}

  

  const blogForm = () => (
  <div> 
    <div>
			<p>{`${user.name} logged in`}
			<button onClick={handleLogout}>Logout</button>
			</p>
		</div>
    <Togglable buttonLabel='new blog'ref={blogFormRef}>
      <BlogForm 
      					titleChange={(e) => setTitle(e.target.value)}
                authorChange={(e) => setAuthor(e.target.value)}
                urlChange={(e) => setUrl(e.target.value)}
                addBlog={(e) => addBlog(e)} 
      />
    </Togglable>
    <br />
    <Bloglist
    	
      blogs={blogs}
      handleLike={(e) => handleLike(e)}
      deleteBlog={(e) => deleteBlog(e)}
    />  

  </div> 
  )  


  
 

  return (
    <div>
      <h1>Blogs</h1>
      {notificationMessage !== null ? <Notification message={notificationMessage} /> : null}
         
      {user === null ?
       
     <Togglable buttonLabel="login">   
      <LoginForm 
      username={username}
      password={password}
      handleUsernameChange={({target}) => setUsername(target.value)}
      handlePasswordChange={({target}) => setPassword(target.value)}
      handleSubmit={handleLogin}
      /> 
    </Togglable>
     :
      blogForm()
      
    }
    </div>
    
  )
}

export default App