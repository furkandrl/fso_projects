import { useState } from "react";

const Button=({handleClick, text})=>(
  <button onClick={handleClick}>
    {text}
  </button>
)

const DisplayAnecdote=({text, num_votes})=>(
  <div>
    <p>{text}</p>
    <p>has {num_votes} votes</p>
  </div>
)


const App=()=> {
  const anecdotes=[
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time. ",
    "Adding manpower to a late software project makes it later!",
    "The best way to get a project done faster is to start sooner ",
    "Even the best planning is not so omniscient as to get it right the first time. ",
    "How does a project get to be a year late?... One day at a time. ",
    "The bearing of a child takes nine months, no matter how many women are assigned. Many software tasks have this characteristic because of the sequential nature of debugging. ",
    "Plan to throw one (implementation) away; you will, anyhow.",
    "Every good work of software starts by scratching a developer's personal itch",
    "Perfection (in design) is achieved not when there is nothing more to add, but rather when there is nothing more to take away",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand."
  ]

  const [selected, setSelected]=useState(0)
  const [votes, setVotes]=useState(new Array(anecdotes.length).fill(0))
  const [max_voted, setMaxVoted]=useState(0)

  const nextAnecdote=()=>{
    setSelected(Math.floor(Math.random()*anecdotes.length))
  }

  const vote=()=>{
    const copy=[...votes]
    copy[selected]+=1
    setVotes(copy)
    if(copy[selected]>copy[max_voted]){
      setMaxVoted(selected)
    }
  }


  return (
    <div>
      <h1>Anecdote of the day</h1>
      <DisplayAnecdote text={anecdotes[selected]} num_votes={votes[selected]}/>
      <Button handleClick={vote} text="vote"/>
      <Button handleClick={nextAnecdote} text="next anecdote"/>
      <h1>Anecdote with most votes</h1>
      <DisplayAnecdote text={anecdotes[max_voted]} num_votes={votes[max_voted]}/>
    </div>
  );
}

export default App;
