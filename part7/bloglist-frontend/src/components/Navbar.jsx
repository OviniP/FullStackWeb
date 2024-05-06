import { Link,useNavigate } from "react-router-dom"
import { useSelector,useDispatch } from "react-redux";
import { removeUser } from "../reducers/user";


const Navbar = ({user}) => {
    /*const dispatch = useDispatch()
    let user = useSelector(state => state.userReducer)
    if(user === null){
        user = JSON.parse(window.localStorage.getItem('user'));
    }*/
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogout = () => {
        window.localStorage.removeItem('user')
        dispatch(removeUser())
        navigate('/')
      }
     
    return(
        <div>
            <Link to='/'>Blogs</Link>    
            <Link to='/users'>Users</Link>
            <div className='user-bar'>
                <h5>{user.name} logged in</h5>
                <button className='btn-logout' onClick={handleLogout}>Logout</button>
            </div>
        </div>
        
    )
}

export default Navbar