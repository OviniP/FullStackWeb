import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification, removeNotification } from '../reducers/notification'
const Blog = ({ blog,
  updateBlog,
  deleteBlog }) => {

  const [isExpanded, setIsExpanded] = useState(false)
  const [expandLabel, setExpandLabel] = useState('View')
  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const changeExpandability = () => {
    console.debug('button clicked')
    setIsExpanded(!isExpanded)
    const lablelText = isExpanded ?  'View' : 'Hide'
    setExpandLabel(lablelText)
  }

  const updateLikes = () => {
    const blogToUpdate = {...blog,likes:blog.likes + 1}
    updateBlog(blogToUpdate)
    dispatch(setNotification({message:'Likes added',type:'info'}))
    setTimeout(() => {
      dispatch(removeNotification()) // Remove notification after 2000ms
  }, 2000);
  }

  const isDeleteAllowed = () => {
    const loggedInUser = localStorage.getItem('loggedInUser')
    if(loggedInUser){
      const loogedUserJson = JSON.parse(loggedInUser)
      return loogedUserJson.id === blog.user.id
    }
    return false
  }

  const removeBlog = () => {
    if(window.confirm(`Delete blog ${blog.title}`))
    {
      deleteBlog(blog.id)
    }
  }

  let isRemoveVisible = isDeleteAllowed()
  return (
    <div style={blogStyle}>
      <div data-testid = 'blog'>
        <div data-testid = 'blog-header'>
          <div>{blog.title}  {blog.author}</div>
          <button onClick={changeExpandability}>{expandLabel}</button>
        </div>
        {isExpanded &&
            <div data-testid = 'blog-content'>
              {blog.url}<br/>
              Likes <label data-testid='likesCount'>{blog.likes}</label>
              <button onClick={updateLikes}>Like</button><br/>
              {blog.user.name}<br/>
              {isDeleteAllowed() &&
            <button onClick={removeBlog}>Remove</button>}
            </div>
        }
      </div>

    </div>
  )}

export default Blog