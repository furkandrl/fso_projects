


const App=()=>{
  const course={
  name:'Half Stack application development',
  parts:[
    {
  name:'Fundementals of React',
  exercises:10
  },
  {
  name:'Using props to pass data',
  exercises:7
 },

  {
  name:"State of a component",
  exercises:14}
  ]
}


return(
  <>
    <Header course={course.name} />
    <Content parts={course.parts}/>
    <Total  parts={course.parts} />
    
  </>
)
}

const Header=(props)=>{
 console.log(props) 
return(
  <h1>{props.course}</h1>
)
}

const Content=(props)=>{
return(
  <div>
  <p>{props.parts[0].name} {props.parts[0].exercises} </p>
  <p>{props.parts[1].name} {props.parts[1].exercises}</p>
  <p>{props.parts[2].name} {props.parts[2].exercises}</p>
    </div>
)
}

const Total=(props)=>{
  return(
    <p>Number of exercises {props.parts[0].exercises+props.parts[1].exercises+props.parts[2].exercises}</p>
  )

}

export default App;
