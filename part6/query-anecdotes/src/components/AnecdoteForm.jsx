import { createAnecdote } from "../requests"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useContext } from "react"
import NotificationContext from "../noificationContext"

const AnecdoteForm = () => {

  const [notification, notificationAndDispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient()
  const addNewMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (anecdote) => {
      //queryClient.invalidateQueries('anecdotes')
      const data = queryClient.getQueryData(['anecdotes'])
      const notificationText = `${anecdote.content} added`
      queryClient.setQueryData(['anecdotes'],data.concat(anecdote))
      notificationAndDispatch({type:'SET',payload:notificationText})
      setTimeout(()=>{
        notificationAndDispatch({type:'REMOVE'})
      }, 5000)
    },
    onError:() => {
      const notificationText = 'Too short anecdote, must have 5 characters or more'
      notificationAndDispatch({type:'SET',payload:notificationText})
      setTimeout(()=>{
        notificationAndDispatch({type:'REMOVE'})
      }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    if(content !== undefined)
    {
      addNewMutation.mutate({content:content, votes: 0})
      console.log('new anecdote')
    }
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
