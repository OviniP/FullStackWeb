import {useSelector} from 'react-redux'

const Notification = ({ message,type }) => {
  const notification = useSelector((state) => 
    {
      return state.notificationReducer
    })
    
  if(notification === null)
    return null
  return(
    <div className = {notification.type}>{notification.message}</div>
  )
}

export default Notification