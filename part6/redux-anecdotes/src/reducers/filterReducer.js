import { createSlice } from "@reduxjs/toolkit";

const initialState = ''

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilter(state, action) {
            state = action.payload
            return state
        }
    }
})

const { reducer } = filterSlice
export const { setFilter } = filterSlice.actions
export default reducer