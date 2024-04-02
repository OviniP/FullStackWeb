import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState: initialState,
    reducers:{
        set:{
            reducer: (state, action) => {
                return action.payload
            },
            prepare: (id) => {//this didnt work
                return {payload: `You voted '${id}'`}
            }
            
        },
        remove(){
            return ''
        }
    }
})

export default notificationSlice.reducer
export const {add} = notificationSlice.actions