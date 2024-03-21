import { useState } from 'react'

const Togglable = (props) =>
{
  const [showChildren, setShowChildren] = useState(false)

  const toggleVisibility = () => {
    setShowChildren(!showChildren)
  }

  return(
    <div>
      <button onClick={toggleVisibility}>{props.btnLabel}</button>
      {showChildren && (props.children)}
      {showChildren && <button onClick={toggleVisibility}>Cancel</button> }
    </div>
  )
}

export default Togglable