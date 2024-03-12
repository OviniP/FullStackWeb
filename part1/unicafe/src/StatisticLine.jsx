const StatisticLine = (props) => {

    if(props.text === "Positive"){
        return(
            <tr><td>{props.text}</td><td>{props.value} %</td></tr>
        )
    }

    return(
        <tr><td>{props.text}</td><td>{props.value}</td></tr>
    )
}

export default StatisticLine