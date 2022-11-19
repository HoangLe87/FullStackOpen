import React, { useState } from 'react';

const Statistics = ({all, good, neutral, bad}) => {
  if (all) {
    return (
     <table>
      <thead></thead>
      <tbody>
        <StatisticsLine text='good' number={good}/>
        <StatisticsLine text='bad' number={bad}/>
        <StatisticsLine text='all' number={all}/>
        <StatisticsLine text='average' number={(good-bad)/all}/>
        <StatisticsLine text='positive' number={(good/all)/all}/>
        </tbody>
        <tfoot></tfoot>
      </table>
    )
  }else {
    return ( 
    <>
      <p>No feedback given</p>
    </>
    )
  }
}

const StatisticsLine = ({text, number}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{number.toFixed(2)}</td>
    </tr>
  )
}

const Button = ({text, clickfunc}) => {
  return (
    <button onClick={clickfunc}>{text}</button>
  )
}


function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  
  const goodAdd = () => {
    setGood(good+1)
    setAll(all+1)
  }

  const goodNeutral = () => {
    setNeutral(neutral+1)
    setAll(all+1)
  }

  const goodBad= () => {
    setBad(bad+1)
    setAll(all+1)
  }

  return (
    <div className="App">
      <h1>give feedback</h1>
      <div className="buttons">
      <Button clickfunc={goodAdd} text='good'/>
      <Button clickfunc={goodBad} text='bad'/>
      <Button clickfunc={goodNeutral} text='neutral'/>
      </div>
      <h1>statistics</h1>
      <Statistics all={all} good={good} bad={bad} neutral={neutral}/>
    </div>
  );
}

export default App;
