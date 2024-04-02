import { useSelector, useDispatch } from "react-redux"

const AnecdoteList = () => {

    const anecdotes = useSelector(({anecdotes,filter}) => {
        return anecdotes.filter(item => item.content.toLowerCase().includes(filter.toLowerCase()))
    })
    const dispatch = useDispatch()

    const vote = (id, content) => {
        console.log('vote', id)
        dispatch({type:'anecdotes/vote', payload:id})
        const notification = `You voted '${content}'`
        dispatch({type:'notification/set', payload:notification})
        setTimeout(()=>{
            dispatch({type:'notification/remove'})
        },1000)
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
                    <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                </div>
                </div>
            )}
        </>
    )
}

export default AnecdoteList