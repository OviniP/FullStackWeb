const Total = ({items}) => {
    return (
        <p>Number of exercises {items[0].exercises + items[1].exercises + items[2].exercises}</p>
    )
}

export default Total