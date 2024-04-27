import { createSlice } from "@reduxjs/toolkit"

const blogSlice = createSlice({
    name:'Blogs',
    initialState:[],
    reducers: {
        appendBlog(state,action){
            state.push(action.payload)
        },
        setBlogs(state,action){
            return action.payload
        },
        incrementLikes(state, action){
            const id = action.payload
            const blogToChange = state.find(b => b.id === id)
            const changedBlog = {...blogToChange, likes: blogToChange.likes + 1}
            const list = state.map(blog => blog.id != id ? blog : changedBlog)
            return list.sort((a,b) => b.likes - a.likes)
        },
        deleteBlog(state, action){
            return state.filter(blog => blog.id != action.payload)
        }
    }
})

export const {appendBlog, setBlogs, incrementLikes, deleteBlog} = blogSlice.actions
export default blogSlice.reducer