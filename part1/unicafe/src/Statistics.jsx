import StatisticLine from "./StatisticLine"

const Statistics = (props) => {
    console.log(props.total)
    if(props.total() <= 0){
        return(
            <p>No feedback Given</p>
        )
    }
    return (
        <>
            <p>Statistics</p>
            <table>
                <tbody>
                    <StatisticLine text ="Good" value={props.good}></StatisticLine>
                    <StatisticLine text ="Neutral" value={props.neutral}></StatisticLine>
                    <StatisticLine text ="Bad" value={props.bad}></StatisticLine>
                    <StatisticLine text ="All" value={props.total()}></StatisticLine>
                    <StatisticLine text ="Average" value={props.average()}></StatisticLine>
                    <StatisticLine text ="Positive" value={props.positivePercent()}></StatisticLine>
                </tbody>
            </table>
            
        </>
    )
}

export default Statistics

