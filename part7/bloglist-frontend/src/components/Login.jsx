import { useDispatch } from "react-redux"
import { useState } from "react"
import Notification from "./notification"
import {addUser} from '../reducers/user'
import { setNotification,removeNotification } from "../reducers/notification"
import loginService from '../services/login'
import blogService from '../services/blogs'

const Login = () => {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const handleLogin = async (event) => {
        event.preventDefault()
        console.log('login in with ', userName, password)
        const credentials = {
          userName : userName,
          password : password
        }
        try{
          const response = await loginService.login(credentials)
          dispatch(addUser(response))
          blogService.setToken(response.token)
          window.localStorage.setItem('user', JSON.stringify(response));
          setUserName('')
          setPassword('')
        }
        catch(exception)
        {
          const notification = {
            message:'Wrong username or passord',
            type:'error'
          }
          dispatch(setNotification(notification))
          setTimeout(() => {
            dispatch(removeNotification())
          },2000)
        }
      }
    

    
 return (
    <div>
    <h3>Login to Application</h3>
    <Notification/>
    <form onSubmit={handleLogin}>
      <div>
        User Name :
        <input type='text' value={userName} onChange={({ target }) => setUserName(target.value)} placeholder='userName'></input>
      </div>
      <div>
        Password :
        <input type ='password' value = {password} onChange = {({ target }) => setPassword(target.value)} placeholder='password'></input>
      </div>
      <div>
        <button type='submit' data-testid='btnSubmit'>Login</button>
      </div>
    </form>
  </div>
 )
}

export default Login