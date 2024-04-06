import { createSlice } from "@reduxjs/toolkit"
import anecdotesService from '../services/anecdotes'

const anecdoteSlice = createSlice(
  {
    name: 'anecdotes',
    initialState: [],
    reducers:{
      vote(state, action){
        return state.map(item => item.id === action.payload ? {...item,votes:item.votes + 1} : item)
                  .sort((a,b) =>  b.votes - a.votes)
      },
      append(state, action) {
         state.push(action.payload)
      },
      setAnecdotes(state, action) {
        return action.payload
      }
    }
  }
)

export const initializeAnecdotes = () => {
  return async dispatch  => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (data) => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.create(data)
    dispatch(append(newAnecdote))
  }
}

export const voteAnecdote = (anecdote) => {
 return async dispatch => {
  await anecdotesService.vote(anecdote)
  dispatch(vote(anecdote.id))
 }
}

export default anecdoteSlice.reducer
export const {vote, append, setAnecdotes} = anecdoteSlice.actions

