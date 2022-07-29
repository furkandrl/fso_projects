import { useSelector, useDispatch} from 'react-redux'
import {voteAnecdote, voteAnecdotes} from '../reducers/anecdoteReducer'
import { setNotification} from '../reducers/notificationReducer'
import { Connect } from 'react-redux'


const AnecdoteList = () =>{
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => {
        if (state.filter.length > 0){
            return state.anecdotes.filter(a => a.content.includes(state.filter))
        }else{
            return state.anecdotes
        }
    })

    const sortedAnecdotes =[...anecdotes].sort((a, b) => b.votes - a.votes)

    const vote = (id) => {
        dispatch(voteAnecdotes(id))
        const anecdote = anecdotes.find(a => a.id === id)
        dispatch(setNotification(`You voted for ${anecdote.content}`, 5000))
    }

    return (
        <div>
            {sortedAnecdotes.map(anecdote =>
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
        </div>
    )
}


export default AnecdoteList