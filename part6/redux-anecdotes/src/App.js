import Filter from './components/Filter'
import Notification from './components/Notification'
import NewAnecdote from './components/NewAnecdote'
import AnecdoteList from './components/AnecdoteList'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initializeAnecdotes } from './reducers/anecdoteReducer'



const App = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])




  return (
    <div>
      <Notification/>
      <h1>Anecdotes</h1>
      <NewAnecdote/>
      <Filter/>
      <AnecdoteList/>
    </div>
  )
}

export default App