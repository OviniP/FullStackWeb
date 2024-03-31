
import { useDispatch} from "react-redux"
import {create} from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {
    
    const dispatch = useDispatch()

    const createNew = (event) => {
        event.preventDefault()
        const value = event.target.content.value
        console.log('new',value)
        event.target.content.value = ''
        dispatch(create(value))
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