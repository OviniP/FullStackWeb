import { useSelector, useDispatch } from "react-redux"
import {addVote} from "../reducers/anecdoteReducer"

const AnecdoteList = () => {

    const anecdotes = useSelector(({anecdotes,filter}) => {
        return anecdotes.filter(item => item.content.toLowerCase().includes(filter.toLowerCase()))
    })
    const dispatch = useDispatch()

    const vote = (id) => {
        console.log('vote', id)
        dispatch(addVote(id))
    }

    return (
        <>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
                </div>
            )}
        </>
    )
}

export default AnecdoteList