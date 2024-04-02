
import { useDispatch} from "react-redux"

const AnecdoteForm = () => {
    
    const dispatch = useDispatch()

    const createNew = (event) => {
        event.preventDefault()
        const value = event.target.content.value
        const notification = `You created '${value}'`
        console.log('new',value)
        event.target.content.value = ''
        dispatch({type:'anecdotes/create', payload: value})
        
        dispatch({type:'notification/set',payload:notification})
        setTimeout(() => {
            dispatch({type:'notification/remove'})
        },2000)
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