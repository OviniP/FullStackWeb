import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMsg, setNotificationMsg] = useState(null)
  const [notificationType, setNotificationType] = useState('')

  useEffect(() => {
    const getBlogs = async () => {
      const blogs = await blogService.getAll()
      const sortedBlogs = blogs.sort((a,b) => b.likes - a.likes)
      setBlogs(sortedBlogs)
    }
    getBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedInUser')
    if(loggedUserJson){
      const loggedInUser = JSON.parse(loggedUserJson)
      setUser(loggedInUser)
      blogService.setToken(loggedInUser.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('login in with ', userName, password)
    const credentials = {
      userName : userName,
      password : password
    }
    try{
      const response = await loginService.login(credentials)
      window.localStorage.setItem('loggedInUser',JSON.stringify(response))
      setUser(response)
      setUserName('')
      setPassword('')
      blogService.setToken(response.token)
    }
    catch(exception)
    {
      setNotificationMsg('Wrong username or password')
      setNotificationType('error')
      setTimeout(() => {
        setNotificationMsg(null)
      },5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  const createPost = async (blog) => {
    const newBlog =  await blogService.createBlog(blog)
    setBlogs(blogs.concat(newBlog))
    setNotificationMsg(`A new Blog ${newBlog.title} by ${user.name}` )
    setNotificationType('info')

    setTimeout(() => {
      setNotificationMsg(null)
    },3000)
  }

  const updatePost = async(blog) => {
    delete blog.user
    const response = await blogService.updateBlog(blog)
    const updatedIndex = blogs.findIndex(blog => blog.id === response.id)
    const newBlogs = [...blogs]
    newBlogs[updatedIndex] = response
    const sortedBlogs = newBlogs.sort((a,b) => b.likes - a.likes)
    setBlogs(sortedBlogs)
  }

  const deletePost = async(id) => {
    const response = await blogService.deleteBlog(id)
    const updatedBlogs = blogs.filter(item => item.id !== id)
    const sortedBlogs = updatedBlogs.sort((a,b) => b.likes - a.likes)
    setBlogs(sortedBlogs)
  }

  if(user === null){
    return (
      <>
        <div>
          <div>Login to Application</div>
          <Notification message={notificationMsg} type={notificationType}></Notification>
          <form onSubmit={handleLogin}>
            <div>
              User Name :
              <input type='text' value={userName} onChange={({ target }) => setUserName(target.value)}></input>
            </div>
            <div>
              Password :
              <input type ='password' value = {password} onChange = {({ target }) => setPassword(target.value)}></input>
            </div>
            <div>
              <button type='submit'>Login</button>
            </div>
          </form>
        </div>
      </>

    )}
  return(
    <div>
      <h2>blogs</h2>
      <Notification message={notificationMsg} type={notificationType}></Notification>
      <div className='user-bar'>
        <h3>{user.name} logged in</h3>
        <button className='btn-logout' onClick={handleLogout}>Logout</button>
      </div>
      <Togglable btnLabel='New Note'>
        <BlogForm createPost = {createPost}></BlogForm>
      </Togglable>
      {
        blogs.map(blog =>
          <Blog key={blog.id} blog={blog} updateBlog={updatePost} deleteBlog={deletePost} />
        )}
    </div>
  )
}

export default App