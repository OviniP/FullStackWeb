const PersonForm = (props) => {
    return (
        <form onSubmit={props.onSubmit}>
            <div>
                name: <input value= {props.newName} onChange={props.handleNameChange}/>
            </div>
            <div>
                Number : <input value={props.newNumber} onChange={props.handleNoChange}></input>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}
export default PersonForm