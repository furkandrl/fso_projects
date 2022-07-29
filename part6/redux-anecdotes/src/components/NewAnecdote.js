import {connect} from 'react-redux'
import {newAnecdote} from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReducer'


const NewAnecdote = (props) => {
 
    const createAnecdote = async (e) => {
        e.preventDefault()
        const anecdote = e.target.anecdote.value
        e.target.anecdote.value=''
        props.newAnecdote(anecdote)
        props.setNotification(`You added ${anecdote}`, 5000)
    }

  return (
   <div>
    <h2> create a new anecdote </h2>
        <form onSubmit={createAnecdote}>
            <div>
                <input name="anecdote"/>
            </div>
            <button type="submit">
                create
            </button>
        </form>
    </div>    
  )
}

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes,
        notification: state.notification
    }
}

const mapDispatchToProps = {
    newAnecdote,
    setNotification
}

const ConnectedNewAnecdote = connect(mapStateToProps, mapDispatchToProps)(NewAnecdote)
export default ConnectedNewAnecdote