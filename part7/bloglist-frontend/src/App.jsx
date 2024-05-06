import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification, removeNotification } from './reducers/notification'
import UsersView from './components/Users'
import User from './components/User'
import BlogList from './components/BlogList'
import Login from './components/Login'
import Notification from './components/notification'
import BlogDetail from './components/BlogDetail'
import Navbar from  './components/Navbar'
import { setBlogs } from './reducers/blog'
import { useResource } from './hooks/useResource'

import {
  BrowserRouter as Router,
  Routes, Route, Link,
  useMatch
} from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  let user = useSelector(state => state.userReducer)
    if(user === null){
        user = JSON.parse(window.localStorage.getItem('user'));
    }
    const [blogs,services] = useResource(`/api/blogs`)
  
  useEffect(() => {
    
    dispatch(setBlogs(blogs))
    /*const getBlogs = async () => {
      const blogs = await blogService.getAll()
      const sortedBlogs = blogs.sort((a,b) => b.likes - a.likes)
      dispatch(setBlogs(sortedBlogs))
    }
    getBlogs()*/
  }, [blogs])

  const userMatch = useMatch('users/:id')
  const blogMatch = useMatch('blogs/:id')
  const matchedUserId = userMatch ? userMatch.params.id : null
  const matchedBlogId = blogMatch ? blogMatch.params.id : null

  //const blogFormRef = useRef()


  
  if(user === null){
    return (
      <>
        <Login/>
      </>

    )}
  return(
    <div>
      <Navbar user = {user}/>
      <h2>blog App</h2>
      <Notification/>

      {/*<Togglable btnLabel='New Blog' ref = {blogFormRef}>
        <BlogForm createPost = {createPost}></BlogForm>
      </Togglable>*/}
      
     <Routes>
        <Route path="/" element={<BlogList services={services} blogs = {blogs}/>}/>
        <Route path="/users" element={<UsersView/>}/>
        <Route path="/users/:id" element={<User id={matchedUserId}/>}/>
        <Route path="/blogs/:id" element={<BlogDetail id = {matchedBlogId}/>}/>
     </Routes> 
      
    </div>
  )
}

export default App