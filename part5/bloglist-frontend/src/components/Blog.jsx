import { useState } from "react"

const Blog = ({ blog }) => {

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
        {blog.likes}<br/>
        {blog.author}<br/>
        </div>
      }
    </div> 
  </div> 
)}

export default Blog