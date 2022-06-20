import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from"./services/person"
import Notification from "./components/Notification";

const Footer = () => {  
  const footerStyle = {    
  color: 'green',    
  fontStyle: 'italic',    
  fontSize: 16  
}  
return (    
<div style={footerStyle}>      
<br />      
<em>Phonebook app, Furkan Dereli 2022</em>    
</div>  )}

const App =(props)=> {
  const[persons, setPersons]=useState([])
  const [newName, setNewName]=useState(
    ''
  )

  const [newNumber, setNewNumber]=useState(
    ''
  )

  const [filter, setFilter] = useState(
    '')
  const [notificationMessage, setNotificationMessage]=useState(null)  

    useEffect(() => {
      personService
      .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
        })
      }, [])

   

  const addPerson=(event)=>{
    event.preventDefault()
    const personsObject = {
      name: newName,
      number: newNumber
  }
    const duplicatingPerson=persons.find(p=>p.name===newName)
   
    
   if(duplicatingPerson){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)===true){
        const updatedPerson={name:newName, number:newNumber}
        personService
        .update(duplicatingPerson.id, updatedPerson)
        .then(returnedPerson=>{

          setNotificationMessage({
            "text": ` ${duplicatingPerson.name}'s number is now updated`,
            "type": "notification"
          })
          setTimeout(() => {
            setNotificationMessage(null)
        }, 5000)
            setPersons(persons.map(person => person.id !==duplicatingPerson.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
        })
        .catch(error => {
          setNotificationMessage({
            "text": `${error.response.data.error}`,
            "type": "error"
        })
        setTimeout(() => {
          setNotificationMessage(null)
      }, 5000)
            
      })
        }    
        }
      
    else{
      personService
      .create(personsObject)
      .then(returnedPerson => {
        
        setNotificationMessage({
          text: `${ newName } is now in your phonebook`,
          type: "notification"
      })

      setTimeout(() => {
          setNotificationMessage(null)
      }, 5000)

        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('') 
  }).catch(error => {
    setNotificationMessage({
      "text": ` ${error.response.data.error}`,
      "type": "error"
  })
      
  
    setTimeout(() => {
        setNotificationMessage(null)    
    }, 5000)
  })

    }
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

  const deletePerson = (e) => {
    const id= e.target.id
    const name=e.target.name
    if (window.confirm(`Do you really want to delete ${ name }?`) === true) {
      personService
          .deletePerson(id)
          .then(deletedPerson => {
            setNotificationMessage({
              "text": `${ name } was removed from server`,
              "type": "notification"
          })
          setTimeout(() => {
              setNotificationMessage(null)
          }, 5000)

              setPersons(persons.filter(person => person.id !== id))
          })
          .catch(error => {
              setNotificationMessage({
              "text": `${ name } was already removed from server`,
              "type": "error"
          })
          setTimeout(() => {
              setNotificationMessage(null)
          }, 5000)

              setPersons(persons.filter(person => person.id !== id))
          })
  }
}




  return (
    <div>
      <h1>Phonebook</h1>

      <Filter handleFilter={handleFilter} />
      
      <h2>Add a new person</h2>
      <PersonForm 
      addPerson={addPerson}
      newName={newName}
      handleAddName={handleAddName}
      newNumber={newNumber}
      handleAddNumber={handleAddNumber}
      />
      <Notification message={notificationMessage}/>
      <h1>Numbers</h1>
      
      <Persons persons={persons} filter={filter} deletePerson={deletePerson}/>
    <Footer/>
    </div>
    
  )
}

export default App;
