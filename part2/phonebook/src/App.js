import { useState } from "react";

import Filter from "./components/Filter";

const App =(props)=> {
  const[persons, setPersons]=useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName]=useState(
    ''
  )

  const [newNumber, setNewNumber]=useState(
    ''
  )

  const [filter, setFilter] = useState(
    '')

  const addPerson=(event)=>{
    event.preventDefault()
    const personObject={
      name: newName,
      number: newNumber,
      id: persons.length+1
    }
   if(persons.find(person=> person.name===newName)){
    return window.alert(`${newName} is already added to phonebook`)
  }
    setPersons(persons.concat(personObject))
    
    setNewName('')
    setNewNumber('')
    
  }

  const handleAddName=(event)=>{
    console.log(event.target.value)
    
    setNewName(event.target.value)
  }

  const handleAddNumber=(event)=>{
    console.log(event.target.value)
    
   setNewNumber(event.target.value)
  }

  const handleFilter=(event)=>{
    console.log(event.target.value)
    setFilter(event.target.value)
  }
 // const duplicateCheck=isEntered
 // ? persons : persons.filter(person=> person.name===true)


const Person=({person})=>{
return(
  <li>{person.name} {person.number}</li>
)}




  return (
    <div>
      <h2>Phonebook</h2>

      <Filter handleFilter={handleFilter} />

      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName}
                 onChange={handleAddName} />
        </div>
        <div>
          number: <input value={newNumber}
                  onChange={handleAddNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form> 
     
    
      <h2>Numbers</h2>
      <ul>
      {persons.map(person => 
          <Person key={person.id} person={person} /> )}  
      </ul>
    </div>
    
  )
}

export default App;
