import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {getAnecdotes, modifyAnecdote} from './requests'
import {useContext} from 'react'
import NoificationContext from './noificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })
  console.log(JSON.parse(JSON.stringify(result)))

  const voteMutation = useMutation({
    mutationFn: modifyAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const [notification, notificationAndDispatch] = useContext(NoificationContext)

  if(result.status === 'pending')
  {
    return <div>Loading....</div>
  }
  if(result.status === 'error'){
    return <div>Anecdote service is not available due to problems in server</div>
  }

  const anecdotes = result.data

  const handleVote = (anecdote) => {
    console.log('vote')
    const notificationText = `You have voted ${anecdote.content}`
    voteMutation.mutate({...anecdote, votes:anecdote.votes + 1})
    notificationAndDispatch({type:'SET',payload:notificationText})
    setTimeout(()=>{
      notificationAndDispatch({type:'REMOVE'})
    }, 5000)
  }


  return (
    
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
