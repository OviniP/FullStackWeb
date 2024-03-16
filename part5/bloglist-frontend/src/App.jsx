import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/notification'
import NoteForm from './components/NoteForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notificationMsg, setNotificationMsg] = useState(null)
  const [notificationType, setNotificationType] = useState('')
  const [noteFormVisibility, setNoteFormVisibility] = useState(false)

  console.log(noteFormVisibility)
  console.log('sssssssssssssss')

  useEffect(() => {
    const getBlogs = async () =>{
      const blogs = await blogService.getAll()
      setBlogs( blogs )
    }
    getBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedInUser')
    if(loggedUserJson){
      const loggedInUser = JSON.parse(loggedUserJson)
      setUser(loggedInUser)
      blogService.setToken(loggedInUser.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('login in with ', userName, password)
    const credentials = {
      userName : userName,
      password : password
    }
    try{
      const response = await loginService.login(credentials)
      window.localStorage.setItem('loggedInUser',JSON.stringify(response))
      setUser(response)
      setUserName('')
      setPassword('')
      blogService.setToken(response.token)
    }
    catch(exception)
    {
      setNotificationMsg('Wrong username or password')
      setNotificationType('error')
      setTimeout(() => {
        setNotificationMsg(null)
      },5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  const createPost = async (event) => {
    event.preventDefault()
    const newBlog =  await blogService.createBlog({title,author,url})
    setBlogs(blogs.concat(newBlog))
    setTitle('')
    setAuthor('')
    setUrl('')
    setNoteFormVisibility(false)
    setNotificationMsg(`A new Blog ${newBlog.title} by ${user.name}` )
    setNotificationType('info')

    setTimeout(() => {
      setNotificationMsg(null)
    },3000)
  }

  if(user === null){
  return (
    <>
    <div>
      <div>Login to Application</div>
      <Notification message={notificationMsg} type={notificationType}></Notification>
      <form onSubmit={handleLogin}>
        <div>
          User Name : 
          <input type='text' value={userName} onChange={({ target }) => setUserName(target.value)}></input>
          </div>
          <div>
          Password :
          <input type ='password' value = {password} onChange = {({target}) => setPassword(target.value)}></input>
          </div>
          <div>
          <button type='submit'>Login</button>
        </div>
      </form>
    </div>
    
    </>
    
  )}
  return(
    <div>
      <h2>blogs</h2>
      <Notification message={notificationMsg} type={notificationType}></Notification>
      <div className='user-bar'>
        <h3>{user.name} logged in</h3>
        <button className='btn-logout' onClick={handleLogout}>Logout</button>
      </div>
      <button onClick={() => {setNoteFormVisibility(true)}} >New Note</button>{noteFormVisibility}
      {
        noteFormVisibility &&
        <NoteForm  title = {title} author = {author} url = {url} createPost = {createPost}
        setTitle={({target}) => setTitle(target.value)} setAuthor={({target}) => setAuthor(target.value)} setUrl={({target}) => setUrl(target.value)}></NoteForm>
      }
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App