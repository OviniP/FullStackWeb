const Part = ({item}) => {
    return(
        <p key={item.name}>
                {item.name} {item.exercises}
        </p>
    )
}

export default Part