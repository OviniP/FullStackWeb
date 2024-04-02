import { useDispatch } from "react-redux"

const Filter = () => {

    const dispatch = useDispatch()

    const filter = (event) => {
        const value = event.target.value
        dispatch({type:'filter/setFilter', payload:value})
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