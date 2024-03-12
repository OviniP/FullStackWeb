const Country = (props) => {

    return(
        <li>
            {props.country.name.common}
            <button type="button" onClick = {() =>props.onSelect(props.country)} className="btnShowInfo">Show</button>
        </li>
    )
}

export default Country