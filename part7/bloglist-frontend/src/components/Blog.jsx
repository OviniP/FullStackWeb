
/*import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification, removeNotification } from '../reducers/notification'
const Blog = ({ blog,
  updateBlog,
  deleteBlog }) => {

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

  const isDeleteAllowed = () => {
    const loggedInUser = localStorage.getItem('loggedInUser')
    if(loggedInUser){
      const loogedUserJson = JSON.parse(loggedInUser)
      return loogedUserJson.id === blog.user.id
    }
    return false
  }

  let isRemoveVisible = isDeleteAllowed()
  return (
    <div style={blogStyle}>
      <div data-testid = 'blog'>
        <div data-testid = 'blog-header'>
          <div>{blog.title}  {blog.author}
            <button onClick={changeExpandability}>{expandLabel}</button>
          </div>
        </div>
      </div>
    </div>
  )}

export default Blog*/