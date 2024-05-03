import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import {setBlogs, incrementLikes, deleteBlog} from '../reducers/blog'
import blogService from '../services/blogs'

const BlogList = () => {
    const blogs = useSelector(state => state.blogReducer)

   return( <>
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