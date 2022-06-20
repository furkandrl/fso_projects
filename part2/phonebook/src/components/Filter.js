import React from 'react'

const Filter=({handleFilter})=>{
    return(
<div>
    filter persons: <input onChange={handleFilter}/>
</div>)
}
export default Filter