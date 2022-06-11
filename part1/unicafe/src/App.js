import { useState } from "react"


const StatisticLine=({text, value})=>(
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics=({good, neutral, bad, allClicks})=>{
  const average=(-1*bad+good)/allClicks
  const positive=(good/allClicks)*100
  if(allClicks===0){
    return(
      <div>
        <p>no feedback given</p>
      </div>
    )
  }
    return(
      <div>
      <table>
      <tbody>
       <StatisticLine text="all" value={allClicks} />
       <StatisticLine text="good" value={good}/>
       <StatisticLine text="neutral" value={neutral}/>
       <StatisticLine text="bad" value={bad}/>
       <StatisticLine text="average" value={average}/>
       <StatisticLine text="positive" value={positive+"%"}/>
      </tbody>
      </table>
      </div>
      )
  
  }

const Button=({handleClick, text})=>(
  <button onClick={handleClick}>
    {text}
  </button>
)


const App=()=> {
  const[good, setGood]=useState(0)
  const[neutral, setNeutral]=useState(0)
  const[bad, setBad]=useState(0)
  const[allClicks, setAll]=useState(0)

  const handleGoodClick=()=>{
  setAll(allClicks+1)
  setGood(good+1)
  }

  const handleNeutralClick=()=>{
  setAll(allClicks+1)
  setNeutral(neutral+1)
  }

  const handleBadClick=()=>{
    setAll(allClicks+1)
    setBad(bad+1)
  }
  
  return(
    <div>
      <h1>give feedback</h1>
     
     <Button handleClick={handleGoodClick} text="good"/>
     <Button handleClick={handleNeutralClick} text="neutral"/>
     <Button handleClick={handleBadClick} text="bad"/>
     <h1>statistics</h1>
     <Statistics good={good} neutral={neutral} bad={bad} allClicks={allClicks}/>

    </div>
  )
  
}

export default App;
