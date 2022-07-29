import React from 'react'
import { setFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = (props) =>{
    const handleChange = (event) => {
        event.preventDefault()
        const filterValue = event.target.value
        props.setFilter(filterValue)
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}



const mapStateToProps = (state) => {
    return {
    filter: state.filter
}
}

const mapDispatchToProps = {
    setFilter
}

const ConnectedFilter = connect(mapStateToProps, mapDispatchToProps)(Filter)

export default ConnectedFilter