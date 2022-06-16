import React from "react";

const Persons=({filter, persons, deletePerson})=>{
    
    const personFiltered=persons.filter(person=>
        person.name.toLowerCase().includes(filter.toLowerCase()))

    const personsToShow=filter.length===0 ? persons : personFiltered

    const showPersons= personsToShow.map(person=>
           <div key={person.id} >   
           <ul>
           <li className="names_and_numbers">{person.name} {person.number}<button name={person.name}
           id={person.id} onClick={deletePerson}>delete</button> </li>
           </ul>
    </div>
    )
  return(
      <div>{showPersons}</div>
    )
}
export default Persons