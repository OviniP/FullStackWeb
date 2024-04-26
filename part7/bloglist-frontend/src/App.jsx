import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { setBlogs, appendBlog } from './reducers/blog'
import { setNotification, removeNotification } from './reducers/notification'
import Notification from './components/notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import UsersView from './components/Users'
import User from './components/User'
import BlogList from './components/BlogList'
import {
  BrowserRouter as Router,
  Routes, Route, Link,
  useMatch
} from 'react-router-dom'

const App = () => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    const getBlogs = async () => {
      const blogs = await blogService.getAll()
      const sortedBlogs = blogs.sort((a,b) => b.likes - a.likes)
      dispatch(setBlogs(sortedBlogs))
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

  const userMatch = useMatch('users/:id')
  const matchedUserId = userMatch ? userMatch.params.id : null

  const blogFormRef = useRef()

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
      const notification = {
        message:'Wrong username or passord',
        type:'error'
      }
      dispatch(setNotification('Wrong username or password'))
      setTimeout(() => {
        dispatch(removeNotification())
      },2000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  const createPost = async (blog) => {
    const newBlog =  await blogService.createBlog(blog)
    blogFormRef.current.toggleVisibility()
    const notification = {
      message:`A new Blog ${newBlog.title} by ${user.name}`,
      type: 'info'
    }
    dispatch(appendBlog(newBlog))
    dispatch(setNotification( notification))

    setTimeout(() => {
      dispatch(removeNotification())
    },3000)
  }
  
/*
  const BlogsView = () => {
   return( <>
        <Togglable btnLabel='New Blog' ref = {blogFormRef}>
        <BlogForm createPost = {createPost}></BlogForm>
      </Togglable>
      <div data-testid='blog-container'>
        {   
            blogs.map(blog =>
            <Blog key={blog.id} blog={blog} updateBlog={updatePost} deleteBlog={deletePost} />
        )}
      </div>
    </>)
  }*/

  if(user === null){
    return (
      <>
        <div>
          <div>Login to Application</div>
          <Notification/>
          <form onSubmit={handleLogin}>
            <div>
              User Name :
              <input type='text' value={userName} onChange={({ target }) => setUserName(target.value)} placeholder='userName'></input>
            </div>
            <div>
              Password :
              <input type ='password' value = {password} onChange = {({ target }) => setPassword(target.value)} placeholder='password'></input>
            </div>
            <div>
              <button type='submit' data-testid='btnSubmit'>Login</button>
            </div>
          </form>
        </div>
      </>

    )}
  return(
    <div>
      <h2>blogs</h2>
      <Notification/>

      <div className='user-bar'>
        <h5>{user.name} logged in</h5>
        <button className='btn-logout' onClick={handleLogout}>Logout</button>
      </div>

      <Togglable btnLabel='New Blog' ref = {blogFormRef}>
        <BlogForm createPost = {createPost}></BlogForm>
      </Togglable>
      
     <Routes>
        <Route path="/" element={<BlogList/>}/>
        <Route path="/users" element={<UsersView/>}/>
        <Route path="/users/:id" element={<User id={matchedUserId}/>}/>
     </Routes> 
      
    </div>
  )
}

export default App