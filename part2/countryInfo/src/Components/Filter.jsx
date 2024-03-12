const Filter = (props) => {
    return(
        <div>
            Find Countries
            <input value={props.filterText} onChange={props.onChange} className="txtFilter"></input>
        </div>
      
    )
}

export default Filter