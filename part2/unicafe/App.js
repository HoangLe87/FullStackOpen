import {useState} from 'react'


/*const Button = ({onClick,text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Statistics = ({good,bad,neutral}) => {
  return (
    <div>
      <h1>Statistics</h1>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
    </div>
  )
}

const Total = ({all}) => {
  const sumFeedback = all.length>0 ? all.reduce((a,b)=>a+b)/all.length: 'N/A'
  const positiveSumFeedback = all.length>0 ? all.filter((x)=>x>0).reduce((a,b)=>a+b)/all.length*100:'N/A'
  return (
    <div>
      <p>all {all.length}</p>
      <p>average {sumFeedback}</p>
      <p>positive {positiveSumFeedback} %</p>
    </div>
  )
}

const App = () => {
  const [good,setGood] = useState(0)
  const [bad,setBad] = useState(0)
  const [neutral,setNeutral] = useState(0)
  const [all, setAll] = useState([])
  const goodHandler = () => {
    setGood(good+1)
    setAll(all.concat(1))
  }  
  const badHandler = () => {
    setBad(bad+1)
    setAll(all.concat(-1))
  }
  const neutralHandler = () => {
    setNeutral(neutral+1)
    setAll(all.concat(0))
  }
  return (
    <div>
      <h1>Give feedback</h1>
      <div><Button onClick= {goodHandler} text='good'/><Button onClick= {neutralHandler} text='neutral'/><Button onClick= {badHandler}  text='bad'/></div>
      <Statistics good={good} bad={bad} neutral={neutral}/>
      <Total all={all} />
    </div>
  )
}*/

const Button = ({onClick,text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const StatisticLine = (props) => {
  return (
    <tbody>
      <tr>
      <td>{props.text} </td>
      <td>{props.value} </td>
      <td>{props.text1} </td>
      </tr>
    </tbody>
  )
}
const Statistics = (props) => {
  const sumFeedback = props.all.length>0 ? props.all.reduce((a,b)=>a+b)/props.all.length: 'N/A'
  const positiveSumFeedback = props.all.length>0 ? props.all.filter((x)=>x>0).reduce((a,b)=>a+b)/props.all.length*100:'N/A'
  if (props.all.length>0) {return (
    <>
      <h1>Statistics</h1>
      <table>
        <StatisticLine text='Good' value={props.good}/>
        <StatisticLine text='Neutral' value={props.neutral}/>
        <StatisticLine text='Bad' value={props.bad}/>
        <StatisticLine text='All' value={props.all.length}/>
        <StatisticLine text='Average' value={sumFeedback}/>
        <StatisticLine text='Positive' value={positiveSumFeedback} text1='%'/>
      </table>
    </>
  )
  } else {
    return (
      <div><h1>Statistics</h1>
      <p>No feedback given</p>
      </div>
    )
  }
}


const App = () => {
  const [good,setGood] = useState(0)
  const [bad,setBad] = useState(0)
  const [neutral,setNeutral] = useState(0)
  const [all, setAll] = useState([])
  const goodHandler = () => {
    setGood(good+1)
    setAll(all.concat(1))
  }  
  const badHandler = () => {
    setBad(bad+1)
    setAll(all.concat(-1))
  }
  const neutralHandler = () => {
    setNeutral(neutral+1)
    setAll(all.concat(0))
  }
  return (
    <div>
      <h1>Give feedback</h1>
      <div><Button onClick= {goodHandler} text='good'/><Button onClick= {neutralHandler} text='neutral'/><Button onClick= {badHandler}  text='bad'/></div>
      <Statistics good={good} bad={bad} neutral={neutral} all={all}/>
    </div>
  )
}

export default App
