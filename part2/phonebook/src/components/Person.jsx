const Person = (props) => {
    const person = props.person;
    const shouldRenderPerson = !props.searchText || person.name.toLowerCase().includes(props.searchText);
    return(
        <>
            {
                shouldRenderPerson && (
                     <li key={person.name}>{person.name} {person.number}
                         <button type='button' onClick={() => props.onDelete(person)}>Delete</button>
                     </li>
                )
            }
        </>
    )
}

export default Person