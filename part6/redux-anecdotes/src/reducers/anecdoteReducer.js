import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'
/*
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]
*/




/*
const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}*/

//const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers:{
    createAnecdote(state, action){
      state.push(action.payload)
      },
    voteAnecdote(state, action){
      const votedAnecdote = action.payload
      const id = action.payload.id
      return state.map(anecdote => anecdote.id === id ? votedAnecdote : anecdote)
    },
    appendAnecdote (state, action) {
      state.push(action.payload)
    },/*
    setAnecdotes(state, action){
      return action.payload
    }*/
  }
})

const {reducer} = anecdoteSlice
export const {voteAnecdote, createAnecdote, appendAnecdote} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    anecdotes.forEach(anecdote => dispatch(appendAnecdote(anecdote)))
  }
}

export const newAnecdote = anecdote => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdotes = id => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.vote(id)
    dispatch(voteAnecdote(votedAnecdote))
  }
}

/*const anecdoteReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type){
    case 'VOTE':{
    let target = state.find(p => p.id === action.data.id)
    target = { ...target, votes: target.votes + 1 }
    return state
      .map(p => (p.id !== action.data.id ? p : target))
      .sort((a, b) => b.votes - a.votes)
  } case 'ADD':{
    return state.concat(action.data)
  } case 'INIT': {
    return action.data
  }
  default:
    return state
  }
}*/

export default reducer