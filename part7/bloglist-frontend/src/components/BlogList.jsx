import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { useRef } from "react"
import {setBlogs, appendBlog} from '../reducers/blog'
import {setNotification} from '../reducers/notification'
import blogService from '../services/blogs'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { useResource } from "../hooks/useResource"

const BlogList = ({services,blogs}) => { 
    const dispatch = useDispatch()
    const user = useSelector(state => state.userReducer)
    //const [blogList,services] = useResource(`/api/blogs`)
    //dispatch(setBlogs(blogs))
    //const blogs = useSelector(state => state.blogReducer)
    const blogFormRef = useRef()

    const createPost = async (blog) => {
      const newBlog =  await services.createBlog(blog)
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

   return( <>
      <Togglable btnLabel='New Blog' ref = {blogFormRef}>
        <BlogForm createPost = {createPost}></BlogForm>
      </Togglable>
      <div data-testid='blog-container'>
        {   
            /*blogs.map(blog =>
            <Blog key={blog.id} blog={blog} updateBlog={updatePost} deleteBlog={deletePost} />
            )*/
            <div>
                {blogs.map(blog => <div  className="blog-item" key={blog.id}><Link  to={`/blogs/${blog.id}`}>{blog.title}</Link></div>)}
            </div>
        }
      </div>
    </>)
}

export default BlogList