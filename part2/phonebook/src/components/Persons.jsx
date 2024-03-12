import Person from './Person'

const Persons = (props) => {
    return(
        <ul>
            {
                props.persons.map((person) => {
                    return <Person key={person.name} person = {person} searchText = {props.searchText}
                    onDelete = {props.onDelete}></Person>
                })
            }
        </ul>
    )
}

export default Persons
