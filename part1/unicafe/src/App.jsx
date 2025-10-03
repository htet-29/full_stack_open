import { useState } from "react";

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>;

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);
  
  const handleGoodClick = () => {
    const updatedGood = good + 1;
    setGood(updatedGood);
    setAll(updatedGood + neutral + bad);
    calculateAverageScore(updatedGood, neutral, bad);
    calculatePositivePercent(updatedGood, neutral, bad);
  }
  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1;
    setNeutral(updatedNeutral);
    setAll(good + updatedNeutral + bad);
    calculateAverageScore(good, updatedNeutral, bad);
    calculatePositivePercent(good, updatedNeutral, bad);
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1;
    setBad(updatedBad);
    setAll(good + neutral + updatedBad);
    calculateAverageScore(good, neutral, updatedBad);
    calculatePositivePercent(good, neutral, updatedBad);
  }

  const calculateAverageScore = (good, neutral, bad) => {
    const goodScore = good * 1;
    const neutralScore = neutral * 0;
    const badScore = bad * -1;
    
    const totalScore = goodScore + neutralScore + badScore;
    const total = good + neutral + bad;
    const averageScore = totalScore / total;
    setAverage(averageScore);
  }
  
  const calculatePositivePercent = (good, neutral, bad) => {
    const total = good + neutral + bad;
    const average = (good / total) * 100;
    setPositive(average);
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text="good"/>
      <Button onClick={handleNeutralClick} text="neutral"/>
      <Button onClick={handleBadClick} text="bad"/>

      <h2>statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p> 
      <p>average {average}</p>
      <p>positive {positive}%</p>
    </div>
  )
}

export default App