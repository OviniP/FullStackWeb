import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState: initialState,
    reducers:{
       /* set:{
            reducer: (state, action) => {
                return action.payload
            },
            prepare: (id) => {//this didnt work
                return {payload: `You voted '${id}'`}
            }
            
        },*/
        set(state,action){
            return action.payload
        },
        remove(){
            return ''
        }
    }
})

export const setNotification = (text, timeout) => {
    return  dispatch => {
        dispatch(set(text))
        setTimeout(() => {
            dispatch(remove())
        }, timeout);
    
    }
}

export default notificationSlice.reducer
export const {set,remove} = notificationSlice.actions