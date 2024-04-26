import { useSelector } from "react-redux"
import Blog from './Blog'
import { useDispatch } from "react-redux"
import {setBlogs} from '../reducers/blog'

const BlogList = () => {
    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogReducer)

    const updatePost = async(blog) => {
        delete blog.user
        const response = await blogService.updateBlog(blog)
        const updatedIndex = blogs.findIndex(blog => blog.id === response.id)
        const newBlogs = [...blogs]
        newBlogs[updatedIndex] = response
        const sortedBlogs = newBlogs.sort((a,b) => b.likes - a.likes)
        dispatch(setBlogs(sortedBlogs))
      }
    
      const deletePost = async(id) => {
        const response = await blogService.deleteBlog(id)
        const updatedBlogs = blogs.filter(item => item.id !== id)
        const sortedBlogs = updatedBlogs.sort((a,b) => b.likes - a.likes)
        dispatch(setBlogs(sortedBlogs))
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