import { createAnecdote } from "../requests"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const AnecdoteForm = () => {

  const queryClient = useQueryClient()
  const addNewMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (anecdote) => {
      //queryClient.invalidateQueries('anecdotes')
      const data = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'],data.concat(anecdote))
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
