import { useResource } from "../hooks/useResource"
import { useParams,Link } from "react-router-dom"

const User = ({id}) => {
    
    const [user, userServices] = useResource(`/api/users/${id}`)


    if(id === null || user.length <= 0 )
        return null 

    return (
        <div>
            <h2>{user.name}</h2>
            <h3>Added blogs</h3>
           
            <div>
                {user.blogs.map(blog => <div key={blog.id}><Link  to={`/blogs/${blog.id}`}>{blog.title}</Link></div>)}
            </div>
        </div>
    )
}

export default User