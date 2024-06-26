import { useDispatch, useSelector } from "react-redux"
import { useResource } from "../hooks/useResource"
import { setNotification, removeNotification } from "../reducers/notification"
import { incrementLikes } from "../reducers/blog"

const BlogDetail = ({id}) => {
    const [blogReceived,services] = useResource(`/api/blogs/${id}`)
    const bloginState = useSelector(state => state.blogReducer.find(r=>r.id === id))
    const blog = bloginState ? bloginState : blogReceived
    const dispatch = useDispatch(state => state.notificationReducer)

    const updateLikes = () => {
        const blogToUpdate = {likes:blog.likes + 1}
        services.updateBlog(blogToUpdate)
        dispatch(incrementLikes(id))
        dispatch(setNotification({message:'Likes added',type:'info'}))
        setTimeout(() => {
          dispatch(removeNotification()) // Remove notification after 2000ms
      }, 2000);
    }

    const addComment = (event) =>{
        event.preventDefault()
        console.log('submit')
    }

    console.log(bloginState)
    return (
        <div>
            <h1>{blog.title}</h1>
            <a href={blog.url}>{blog.url}</a>
            <div>{blog.likes } Likes <button onClick={updateLikes}>Like</button> </div>
            <div>Added by {blog?.user?.name}</div>
            <br/>
            <div>
                <h3>Comments</h3>
                <div>
                    <form onSubmit={addComment}>
                        <input type="text"></input>
                        <button>Add Comment</button>
                    </form>
                </div>
                <ul>
                 {blog.comments.map(c => <li key={c.id}>{c.text}</li>)}
                </ul>
            </div>
        </div>
    )

}

export default BlogDetail