import { createSlice, current} from '@reduxjs/toolkit'


const notificationSlice = createSlice({
    name: 'notifications',
    initialState:null,
    reducers:{
        setNotification(state, action){
            return action.payload; // Update state with the notification
        },
        removeNotification(state,action){
            return null
        }
    }
})

export const {setNotification, removeNotification} = notificationSlice.actions
export default notificationSlice.reducer