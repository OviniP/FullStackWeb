import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setBlogs, appendBlog } from './reducers/blog'
import { setNotification, removeNotification } from './reducers/notification'
import { removeUser } from './reducers/user'
import blogService from './services/blogs'
import loginService from './services/login'
import UsersView from './components/Users'
import User from './components/User'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Login from './components/Login'
import Notification from './components/notification'

import {
  BrowserRouter as Router,
  Routes, Route, Link,
  useMatch
} from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.userReducer)

  useEffect(() => {
    const getBlogs = async () => {
      const blogs = await blogService.getAll()
      const sortedBlogs = blogs.sort((a,b) => b.likes - a.likes)
      dispatch(setBlogs(sortedBlogs))
    }
    getBlogs()
  }, [])

  useEffect(() => {
    /*const loggedUserJson = window.localStorage.getItem('loggedInUser')
    if(loggedUserJson){
      const loggedInUser = JSON.parse(loggedUserJson)
      setUser(loggedInUser)
      blogService.setToken(loggedInUser.token)
    }*/


  }, [])

  const userMatch = useMatch('users/:id')
  const matchedUserId = userMatch ? userMatch.params.id : null

  const blogFormRef = useRef()
  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    dispatch(removeUser())
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
  
  if(user === null){
    return (
      <>
        <Login/>
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