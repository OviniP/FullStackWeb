
const Filter = (props) => {
    
    return (
        <div>
            Filter Shown with 
            <input value = {props.searchText} onChange={props.handleSearch}></input>
        </div>
    )
}

export default Filter;