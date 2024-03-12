import { useState } from 'react'
import Button from './Button'
import Statistics from './Statistics'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodClick = () =>{
    setGood(good + 1)
  }

  const badClick = () =>{
    setBad(bad + 1)
  }

  const neutralClick = () =>{
    setNeutral(neutral + 1)
  }

  const total = () => {
    return good + bad + neutral;
  }

  const average = () =>{
    
    if(total() > 0 )
    {
      let val = ((good * 1) + (bad * -1) + (neutral * 0))/total();
      return val.toFixed(2);
    }
  }

  const positivePercent = () =>{
    if(total() > 0 )
    {
      let val = good/total() * 100
      return val.toFixed(2);
    }
  }

  return (
    <>
      <p>Give Feedback</p>
      <div>
        <Button onClick={() => goodClick()} text="good"></Button>
        <Button onClick={() => neutralClick()} text="neutral"></Button>
        <Button onClick={() => badClick()} text="bad"></Button>
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} total={() => total()} average={() => average()} positivePercent={()=>positivePercent()} ></Statistics>
    </>
  )
}

export default App