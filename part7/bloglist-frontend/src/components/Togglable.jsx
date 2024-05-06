import { useState, forwardRef, useImperativeHandle } from 'react'
import Button from 'react-bootstrap/Button';

const Togglable = forwardRef((props, refs) =>
{
  const [showChildren, setShowChildren] = useState(false)

  const toggleVisibility = () => {
    setShowChildren(!showChildren)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return(
    <div>
      <Button onClick={toggleVisibility}>{props.btnLabel}</Button>
      {showChildren && (props.children)}
      {showChildren && <button onClick={toggleVisibility}>Cancel</button> }
    </div>
  )
})
export default Togglable