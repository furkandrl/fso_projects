import React from "react";

const PersonForm=({addPerson, newName, handleAddName,
newNumber, handleAddNumber})=>{

return(
<form onSubmit={addPerson}>
<div>
  name: <input value={newName} placeholder="at least 3 characters"
         onChange={handleAddName} />
</div>
<div>
  number: <input value={newNumber} placeholder="at least 8 characters"
          onChange={handleAddNumber}/>
</div>
<div>
  <button type="submit">add</button>
</div>
</form> 
)
}

export default PersonForm