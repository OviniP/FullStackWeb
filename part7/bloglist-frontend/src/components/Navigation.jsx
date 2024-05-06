import { Link,useNavigate } from "react-router-dom"
import { useSelector,useDispatch } from "react-redux"
import { removeUser } from "../reducers/user"
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button';


const Navigation = ({user}) => {
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
        <>
        {/*<div>
            <Link to='/'>Blogs</Link>    
            <Link to='/users'>Users</Link>
            <div className='user-bar'>
                <h5>{user.name} logged in</h5>
                <button className='btn-logout' onClick={handleLogout}>Logout</button>
            </div>
        </div>*/}
        
        <Navbar  className="bg-body-tertiary">
            <Container>
            <Nav className="me-auto">
                <Nav.Link href='/'>Blogs</Nav.Link>
               <Nav.Link href='/users'>Users</Nav.Link>
            </Nav>
            <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
                Signed in as: {user.name}
            </Navbar.Text>
            <Button onClick={handleLogout}>Logout</Button>
            </Navbar.Collapse>
            </Container>
        </Navbar>
         
        </>

    )
}

export default Navigation