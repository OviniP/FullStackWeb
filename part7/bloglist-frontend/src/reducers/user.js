import { createSlice } from "@reduxjs/toolkit";

const userReducer = createSlice({
    name:'user',
    initialState:null,
    reducers:{
        addUser(state,action){
            state = null
            return action.payload
        },
        removeUser(state, action){
            return null
        }
    }
})

export default userReducer.reducer
export const {addUser, removeUser} = userReducer.actions 