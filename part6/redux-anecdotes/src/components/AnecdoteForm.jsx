
import { useDispatch} from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
    
    const dispatch = useDispatch()

    const createNew = async (event) => {
        event.preventDefault()
        const value = event.target.content.value
        const notification = `You created '${value}'`
        event.target.content.value = ''
        dispatch(createAnecdote({content:value}))
        dispatch(setNotification(notification, 2000))
        
    }

    return(
        <>
            <h2>create new</h2>
            <form onSubmit={createNew}>
                <div><input name = 'content'/></div>
                <button>create</button>
            </form>
        </>
    )
}

export default AnecdoteForm