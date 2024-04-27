import { useSelector } from "react-redux"
import Blog from './Blog'
import { useDispatch } from "react-redux"
import {setBlogs, incrementLikes, deleteBlog} from '../reducers/blog'
import blogService from '../services/blogs'

const BlogList = () => {
    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogReducer)

    const updatePost = async(blog) => {
        delete blog.user
        const response = await blogService.updateBlog(blog)
        dispatch(incrementLikes(blog.id))
      }
    
      const deletePost = async(id) => {
        const response = await blogService.deleteBlog(id)
        dispatch(deleteBlog(id))
      }

    return( <>
      <div data-testid='blog-container'>
        {   
            blogs.map(blog =>
            <Blog key={blog.id} blog={blog} updateBlog={updatePost} deleteBlog={deletePost} />
        )}
      </div>
    </>)
}

export default BlogList