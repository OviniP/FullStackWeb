import { createSlice } from "@reduxjs/toolkit"

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteSlice = createSlice(
  {
    name: 'anecdotes',
    initialState: [],
    reducers:{
      vote(state, action){
        return state.map(item => item.id === action.payload ? {...item,votes:item.votes + 1} : item)
                  .sort((a,b) =>  b.votes - a.votes)
      },
      create(state, action) {
         state.push(action.payload)
      },
      setAnecdotes(state, action) {
        return action.payload
      }
    }
  }
)
export default anecdoteSlice.reducer
export const {vote, create, setAnecdotes} = anecdoteSlice.actions