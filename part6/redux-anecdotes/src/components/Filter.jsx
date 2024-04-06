import { useDispatch } from "react-redux"
import { filterAnecdotes } from "../reducers/filterReducer"

const Filter = () => {

    const dispatch = useDispatch()

    const filter = (event) => {
        const value = event.target.value
        dispatch(filterAnecdotes(value))
    }

    const style = {
        marginBottom:'10px'
    }
    return(
        <div style={style}>
            <input type="text" name="filter" onKeyUp={filter}></input>
        </div>
    )
}

export default Filter