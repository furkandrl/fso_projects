import { createSlice } from "@reduxjs/toolkit"

const initialState = ''
let timeoutID 

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        addNotification(state, action){
            state = action.payload
            return state
        },
        hideNotification(state, action) {
            state = initialState
            return state
        }
    }

})

const { reducer } = notificationSlice
export const { addNotification, hideNotification } = notificationSlice.actions

export const setNotification = (message, seconds) => {
    return dispatch => {
        clearTimeout(timeoutID)
        dispatch(addNotification(message))
        timeoutID = setTimeout(() => dispatch(hideNotification()), seconds)
    }
}
export default reducer