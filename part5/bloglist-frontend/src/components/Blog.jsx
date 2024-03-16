import { useState } from "react"

const Blog = ({ blog,
                updateBlog,
                deleteBlog }) => {

  const [isExpanded, setIsExpanded] = useState(false)
  const [expandLabel, setExpandLabel] = useState('View')
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const changeExpandability = () => {
    setIsExpanded(!isExpanded)
    const lablelText = isExpanded ?  'View' : 'Hide'
    setExpandLabel(lablelText)
  }

  const updateLikes = () => {
    blog.likes = blog.likes + 1
    updateBlog(blog)
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
    <div>
      <div>
        {blog.title}
        <button onClick={changeExpandability}>{expandLabel}</button>
      </div>
      {isExpanded && 
        <div>
        {blog.url}<br/>
        Likes {blog.likes}
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